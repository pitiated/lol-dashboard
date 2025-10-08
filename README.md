# 🏆 LoL Flex Squad Dashboard

A professional League of Legends dashboard for tracking your 5-player Flex Ranked team performance on the **LAS (Latin America South)** server. Get instant stats, MVP rankings, and detailed match analytics!

## ✨ Features

- **MVP Ranking System**: Automatically ranks players from MVP (👑) to Troll (🤡) based on:
  - KDA (30% weight)
  - Team Damage Percentage (20% weight)
  - Gold Per Minute (15% weight)
  - Vision Score (10% weight)
  - Kill Participation (25% weight)

- **Comprehensive Stats**:
  - Full KDA, CS, Gold, Damage stats
  - Item builds with purchase order
  - Vision score and kill participation
  - Gold and damage comparison charts
  - Current ranked tier display

- **Beautiful UI**:
  - Dark gaming theme with gradient backgrounds
  - Responsive design for all devices
  - Interactive charts and visualizations
  - Real-time match data from Riot API

## 🚀 Quick Start

### Prerequisites
- [Python 3.8+](https://www.python.org/downloads/)
- [Node.js 16+](https://nodejs.org/)
- [Riot Games API Key](https://developer.riotgames.com/)

### Get Your Riot API Key
1. Go to [Riot Developer Portal](https://developer.riotgames.com/)
2. Sign in with your Riot account
3. Generate a Development API Key (lasts 24 hours)
4. For production, apply for a Production API Key

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env and add your Riot API key
# RIOT_API_KEY=RGAPI-your-actual-key-here

# Run the server
python main.py
```

Backend will run on `http://localhost:8000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Run the app
npm start
```

Frontend will run on `http://localhost:3000`

## 🎮 How to Use

1. **Enter Player Riot IDs**:
   - Enter your squad's Riot IDs (GameName#TAG)
   - You can enter 1-5 players
   - Example: `Faker#KR1`, `Doublelift#NA1`

2. **Fetch Stats**:
   - Click "Get Last Match Stats"
   - The app fetches the most recent Ranked Flex match

3. **View Dashboard**:
   - See MVP rankings (from best to worst)
   - Analyze detailed stats table
   - Check item builds
   - Compare damage and gold charts

## 📊 MVP Ranking Algorithm

The dashboard calculates an MVP score for each player:

```
MVP Score = (KDA × 30) + (Team Damage % × 20) + (GPM/10 × 15) + (Vision Score × 10) + (Kill Participation % × 25)
```

Rankings:
- 👑 **Rank 1**: MVP
- 🥈 **Rank 2**: Great
- 🥉 **Rank 3**: Good
- 😐 **Rank 4**: Meh
- 🤡 **Rank 5**: Troll

## 🌐 Deploy to Production (FREE)

### Backend - Deploy to Render

1. Create account at [Render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add Environment Variable:
   - Key: `RIOT_API_KEY`
   - Value: Your Riot API key
6. Deploy!

Your API will be at: `https://your-app.onrender.com`

### Frontend - Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. From the frontend directory: `vercel`
3. Follow prompts to deploy
4. Set environment variable:
   ```bash
   vercel env add REACT_APP_API_URL
   # Enter your Render API URL
   ```
5. Redeploy: `vercel --prod`

Your dashboard will be at: `https://your-app.vercel.app`

## 🔧 Tech Stack

**Backend:**
- FastAPI (Python web framework)
- Riot Games API integration
- Async HTTP requests with httpx

**Frontend:**
- React with TypeScript
- Recharts for data visualization
- Axios for API calls
- Responsive CSS with animations

## 📝 API Endpoints

### `POST /api/match-stats`

Get match statistics for a group of players.

**Request Body:**
```json
{
  "players": [
    {"game_name": "PlayerName", "tag_line": "TAG1"},
    {"game_name": "Player2", "tag_line": "TAG2"}
  ]
}
```

**Response:**
```json
{
  "matchId": "LA2_123456789",
  "gameCreation": "2025-10-07T12:00:00",
  "gameDuration": 1800,
  "gameMode": "CLASSIC",
  "players": [...]
}
```

## 🐛 Troubleshooting

**"Player not found" error:**
- Make sure Riot ID format is correct: `GameName#TAG`
- Check the player has played Ranked Flex recently

**"No recent ranked flex matches found":**
- The player needs to have played at least 1 Ranked Flex match
- Match data may take a few minutes to appear after game ends

**API Rate Limit errors:**
- Development keys allow 20 requests/second, 100 requests/2 minutes
- Wait a bit between requests
- For production, apply for a Production API key

**CORS errors in browser:**
- Make sure backend is running on port 8000
- Check REACT_APP_API_URL in frontend .env

## 🤝 Contributing

Feel free to fork and improve! Some ideas:
- Add match history (last 5 games)
- Champion mastery display
- Team composition analysis
- Performance trends over time
- Support for other queues (Solo/Duo)

## 📜 License

MIT License - feel free to use for your squad!

## 🎯 Support

- [Riot API Docs](https://developer.riotgames.com/docs/lol)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React Docs](https://react.dev/)

---

Made with ❤️ for the LAS League of Legends community!
