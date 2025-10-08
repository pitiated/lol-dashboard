# 🚀 Deployment Guide

## Your Current Riot API Key
```
RGAPI-57192b72-1d16-4368-8467-1ceee10dde38
```

**Note**: This key expires in 24 hours. To update it:
1. Get new key from https://developer.riotgames.com/
2. Update in Render dashboard: Environment Variables → Edit RIOT_API_KEY
3. Redeploy if necessary

## Backend - Render Deployment

### Option 1: Via Dashboard (Recommended)
1. Go to https://render.com/
2. Sign in / Create account
3. Click "New +" → "Web Service"
4. Connect GitHub (you'll need to push this repo to GitHub first)
5. Or use "Deploy from GitHub URL" (public repo)
6. Configure:
   - **Name**: `lol-dashboard-api`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
7. Add Environment Variable:
   - **Key**: `RIOT_API_KEY`
   - **Value**: `RGAPI-57192b72-1d16-4368-8467-1ceee10dde38`
8. Click "Create Web Service"

Your API URL will be: `https://lol-dashboard-api.onrender.com`

### Option 2: Without GitHub
If you don't want to use GitHub, use a free alternative like Railway.app:
1. Go to https://railway.app/
2. Click "Start a New Project" → "Deploy from GitHub repo" or "Empty Project"
3. Add variables and same config as above

## Frontend - Vercel Deployment

### From Command Line (Easiest):
```bash
cd frontend
vercel
```

When prompted:
- Login to your Vercel account
- Set up project? **Yes**
- Which scope? (Choose your account)
- Link to existing project? **No**
- Project name? **lol-dashboard** (or any name)
- In which directory is your code? **./frontend** or **.**
- Override settings? **No**

After deployment:
```bash
# Add your backend API URL as environment variable
vercel env add REACT_APP_API_URL production
# Enter: https://lol-dashboard-api.onrender.com (your Render backend URL)

# Redeploy with env vars
vercel --prod
```

Your dashboard will be at: `https://lol-dashboard-[your-vercel-id].vercel.app`

## Quick GitHub Push (if needed for Render)

```bash
# Create repo on GitHub first, then:
cd lol-dashboard
git remote add origin https://github.com/YOUR_USERNAME/lol-dashboard.git
git branch -M main
git push -u origin main
```

## Testing Your Deployed Dashboard

1. Go to your Vercel URL
2. Enter 1-5 Riot IDs (format: `GameName#TAG`)
3. Click "Get Last Match Stats"
4. View your team's performance!

## Updating Your API Key

When your Riot API key expires (every 24 hours for dev keys):

1. Get new key: https://developer.riotgames.com/
2. Update Render:
   - Dashboard → Your Service → Environment
   - Edit `RIOT_API_KEY` variable
   - Save (auto-redeploys)

For production API key (no expiration), apply at Riot Developer Portal.
