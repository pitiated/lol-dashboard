from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from typing import List, Optional
from datetime import datetime
import asyncio
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="LoL Dashboard API")

# CORS configuration for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Riot API Configuration
RIOT_API_KEY = os.getenv("RIOT_API_KEY", "RGAPI-your-key-here")
PLATFORM_URL = "https://la2.api.riotgames.com"
REGION_URL = "https://americas.api.riotgames.com"

class PlayerInput(BaseModel):
    game_name: str
    tag_line: str

class MatchRequest(BaseModel):
    players: List[PlayerInput]

async def get_puuid(game_name: str, tag_line: str):
    """Get PUUID from Riot ID"""
    async with httpx.AsyncClient() as client:
        headers = {"X-Riot-Token": RIOT_API_KEY}
        url = f"{REGION_URL}/riot/account/v1/accounts/by-riot-id/{game_name}/{tag_line}"
        response = await client.get(url, headers=headers)
        if response.status_code != 200:
            raise HTTPException(status_code=404, detail=f"Player {game_name}#{tag_line} not found")
        return response.json()["puuid"]

async def get_summoner_data(puuid: str):
    """Get summoner data including rank - uses PUUID for league entries"""
    async with httpx.AsyncClient() as client:
        headers = {"X-Riot-Token": RIOT_API_KEY}

        # Get ranked data directly using PUUID (newer API method)
        ranked_url = f"{PLATFORM_URL}/lol/league/v4/entries/by-puuid/{puuid}"
        ranked_response = await client.get(ranked_url, headers=headers)
        ranked_data = ranked_response.json() if ranked_response.status_code == 200 else []

        # Find RANKED_FLEX_SR queue
        flex_rank = next((r for r in ranked_data if r["queueType"] == "RANKED_FLEX_SR"), None)

        return {
            "rank": flex_rank
        }

async def get_last_match(puuid: str):
    """Get the most recent ranked flex match ID"""
    async with httpx.AsyncClient() as client:
        headers = {"X-Riot-Token": RIOT_API_KEY}
        # Get ranked flex matches (queue=440)
        url = f"{REGION_URL}/lol/match/v5/matches/by-puuid/{puuid}/ids?queue=440&count=1"
        response = await client.get(url, headers=headers)
        if response.status_code != 200 or not response.json():
            raise HTTPException(status_code=404, detail="No recent ranked flex matches found")
        return response.json()[0]

async def get_match_details(match_id: str):
    """Get detailed match information"""
    async with httpx.AsyncClient() as client:
        headers = {"X-Riot-Token": RIOT_API_KEY}
        url = f"{REGION_URL}/lol/match/v5/matches/{match_id}"
        response = await client.get(url, headers=headers)
        if response.status_code != 200:
            raise HTTPException(status_code=404, detail="Match details not found")
        return response.json()

def calculate_mvp_score(participant):
    """Calculate MVP score based on performance metrics"""
    kda = (participant["kills"] + participant["assists"]) / max(participant["deaths"], 1)
    damage_share = participant.get("challenges", {}).get("teamDamagePercentage", 0) * 100
    gold_per_min = participant["goldEarned"] / (participant["timePlayed"] / 60)
    vision_score = participant["visionScore"]
    kill_participation = participant.get("challenges", {}).get("killParticipation", 0) * 100

    # Weighted score
    mvp_score = (
        kda * 30 +
        damage_share * 20 +
        (gold_per_min / 10) * 15 +
        vision_score * 10 +
        kill_participation * 25
    )

    return round(mvp_score, 2)

@app.get("/")
async def root():
    return {"message": "LoL Dashboard API", "status": "running"}

@app.post("/api/match-stats")
async def get_match_stats(request: MatchRequest):
    """Get last match stats for a group of players"""
    try:
        # Get PUUIDs for all players
        player_puuids = []
        for player in request.players:
            puuid = await get_puuid(player.game_name, player.tag_line)
            player_puuids.append({
                "puuid": puuid,
                "game_name": player.game_name,
                "tag_line": player.tag_line
            })

        # Get the most recent match from first player
        match_id = await get_last_match(player_puuids[0]["puuid"])

        # Get match details
        match_data = await get_match_details(match_id)

        # Get summoner data for all players
        summoner_tasks = [get_summoner_data(p["puuid"]) for p in player_puuids]
        summoner_data_list = await asyncio.gather(*summoner_tasks)

        # Extract relevant participant data
        participants = match_data["info"]["participants"]
        player_stats = []

        for idx, player_info in enumerate(player_puuids):
            # Find this player in participants
            participant = next(
                (p for p in participants if p["puuid"] == player_info["puuid"]),
                None
            )

            if participant:
                # Get rank data for this player (summoner_data_list is in same order as player_puuids)
                summoner_info = summoner_data_list[idx] if idx < len(summoner_data_list) else None
                rank_info = summoner_info["rank"] if summoner_info else None

                mvp_score = calculate_mvp_score(participant)

                player_stats.append({
                    "gameName": player_info["game_name"],
                    "tagLine": player_info["tag_line"],
                    "champion": participant["championName"],
                    "kills": participant["kills"],
                    "deaths": participant["deaths"],
                    "assists": participant["assists"],
                    "kda": round((participant["kills"] + participant["assists"]) / max(participant["deaths"], 1), 2),
                    "cs": participant["totalMinionsKilled"] + participant["neutralMinionsKilled"],
                    "gold": participant["goldEarned"],
                    "damage": participant["totalDamageDealtToChampions"],
                    "damageTaken": participant["totalDamageTaken"],
                    "visionScore": participant["visionScore"],
                    "items": [
                        participant["item0"],
                        participant["item1"],
                        participant["item2"],
                        participant["item3"],
                        participant["item4"],
                        participant["item5"],
                        participant["item6"]
                    ],
                    "win": participant["win"],
                    "mvpScore": mvp_score,
                    "goldPerMinute": round(participant["goldEarned"] / (participant["timePlayed"] / 60), 2),
                    "damagePerMinute": round(participant["totalDamageDealtToChampions"] / (participant["timePlayed"] / 60), 2),
                    "killParticipation": round(participant.get("challenges", {}).get("killParticipation", 0) * 100, 1),
                    "rank": {
                        "tier": rank_info["tier"] if rank_info else "UNRANKED",
                        "division": rank_info["rank"] if rank_info else "",
                        "lp": rank_info["leaguePoints"] if rank_info else 0
                    } if rank_info else None
                })

        # Sort by MVP score
        player_stats.sort(key=lambda x: x["mvpScore"], reverse=True)

        # Add rankings
        for idx, player in enumerate(player_stats):
            player["ranking"] = idx + 1

        # Match summary
        game_duration = match_data["info"]["gameDuration"]
        game_mode = match_data["info"]["gameMode"]
        game_creation = datetime.fromtimestamp(match_data["info"]["gameCreation"] / 1000)

        return {
            "matchId": match_id,
            "gameCreation": game_creation.isoformat(),
            "gameDuration": game_duration,
            "gameMode": game_mode,
            "players": player_stats
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
