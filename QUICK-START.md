# 🚀 Quick Start Guide - LoL Flex Squad Dashboard

## 📍 Your Dashboard
**Live URL:** https://frontend-li8p06x96-pitiateds-projects.vercel.app

---

## 🎮 Three Ways to Use Your Dashboard:

### 1️⃣ Last Match Stats (All 10 Players)
**What it does:** Shows ALL 10 players from one match with MVP rankings 1-10

**How to use:**
1. Enter **any player** from the match (e.g., `Pitiated#ehne`)
   - Or enter multiple players from your squad (1-5)
2. Click **"📊 Get Last Match Stats"**
3. See:
   - Top 5 players (ranks 1-5)
   - Bottom 5 players (ranks 6-10)
   - Team 1 vs Team 2 breakdown
   - Full stats table with all players
   - Damage and gold charts
   - Item builds

**Best for:** Seeing who was MVP/Troll in a specific match across BOTH teams

---

### 2️⃣ Last 5 Matches (Single Player History)
**What it does:** Shows ONE player's last 5 matches with performance trends

**How to use:**
1. Enter **ONLY 1 player** (e.g., `Pitiated#ehne`)
2. Click **"🏆 Get Last 5 Matches (1 player only)"**
3. See:
   - Average stats (KDA, Win Rate, CS, Damage, etc.)
   - All 5 matches with rankings
   - Each match shows all 10 players
   - Performance over time

**Best for:** Tracking a single player's improvement or decline

---

### 3️⃣ Compare Squad (Multi-Player Comparison) 🆕
**What it does:** Compares 1-5 players' last 5 matches side-by-side

**How to use:**
1. Enter **1-5 players** from your squad:
   - Pitiated#ehne
   - DawWatcher#LAS
   - DRiLLoN#LAS
   - Haao3#LAS
   - caldesaun#LAS
2. Click **"⚔️ Compare Squad (1-5 players)"**
3. See:
   - **Overall Rankings Podium** (1st 👑, 2nd 🥈, 3rd 🥉)
   - **Performance Badges:**
     - 👑 MVP Count (times ranked #1)
     - 🥉 Top 3 Count (times in top 3)
     - 🤡 Troll Count (times ranked #10)
   - **Comparison Charts:**
     - KDA & Win Rate
     - Damage & Gold
     - MVP Score & MVP Count
   - **Detailed Stats Table** with all metrics
   - **Match History** for each player (compact view)

**Best for:**
- Finding out who's the REAL carry
- Settling squad arguments with DATA
- Roasting your friends scientifically 🔥
- Tracking squad improvement

---

## 🔑 When API Key Expires (Daily)

**Symptoms:** "Network error" or "401 Unauthorized"

**Fix:**
1. Go to: https://developer.riotgames.com/
2. Sign in → Regenerate API Key
3. Copy the new key (starts with `RGAPI-`)
4. Update in Render:
   - Go to: https://dashboard.render.com/
   - Click `lol-dashboard-api`
   - Click "Environment" tab
   - Edit `RIOT_API_KEY`
   - Paste new key → Save
5. Wait ~30 seconds for redeploy

---

## 🏆 Your Squad
- Pitiated#ehne
- DawWatcher#LAS
- DRiLLoN#LAS
- Haao3#LAS
- caldesaun#LAS

---

## 💡 Pro Tips

1. **Compare Squad is the most fun!** Use it to see who's carrying and who's trolling
2. **Share the URL** with your friends - they can use it too!
3. **Best time to check:** Right after a match to see the fresh stats
4. **MVP Score explained:** Weighted combination of KDA (30%), Team Damage% (20%), Gold/Min (15%), Vision (10%), Kill Participation (25%)

---

## 📊 Understanding Rankings

**Emojis:**
- 👑 Rank 1 - MVP
- 🥈 Rank 2 - Great
- 🥉 Rank 3 - Good
- 😊 Rank 4 - OK
- 😐 Rank 5 - Meh
- 😕 Rank 6 - Below Average
- 😬 Rank 7 - Bad
- 😢 Rank 8 - Worse
- 💩 Rank 9 - Terrible
- 🤡 Rank 10 - TROLL

---

## 🆘 Troubleshooting

**"Network error"**
→ API key expired, get new one (see above)

**"No recent ranked flex matches found"**
→ Player hasn't played Ranked Flex recently

**"Player not found"**
→ Check spelling: `GameName#TAG` (case-sensitive)

**Backend is slow (30-60 seconds)**
→ Normal! Render free tier sleeps after 15min inactivity

**Can't see all 10 players**
→ Make sure you're using the latest version (check URL matches this guide)

---

## 📱 Links

- **Dashboard:** https://frontend-li8p06x96-pitiateds-projects.vercel.app
- **Backend API:** https://lol-dashboard-api.onrender.com
- **GitHub Repo:** https://github.com/pitiated/lol-dashboard
- **Riot Developer Portal:** https://developer.riotgames.com/

---

**Have fun and may your squad always be MVP tier! 👑**
