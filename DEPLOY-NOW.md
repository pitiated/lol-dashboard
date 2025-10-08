# 🚀 Deploy Your Dashboard NOW (Step-by-Step)

## ✅ What's Ready
- ✅ Backend code ready in `C:\Users\sebao\lol-dashboard\backend`
- ✅ Frontend code ready in `C:\Users\sebao\lol-dashboard\frontend`
- ✅ Git repository initialized and committed
- ✅ Your API key: `RGAPI-57192b72-1d16-4368-8467-1ceee10dde38`

## 🎯 Deploy in 10 Minutes

### Step 1: Deploy Backend to Render (5 minutes)

**Option A: Via GitHub (Recommended)**
1. Create a GitHub account at https://github.com (if you don't have one)
2. Create new repository: https://github.com/new
   - Name: `lol-dashboard`
   - Keep it Public (or Private if you have Pro)
   - Don't initialize with README
   - Click "Create repository"

3. Push your code (run in terminal):
   ```bash
   cd C:\Users\sebao\lol-dashboard
   git remote add origin https://github.com/YOUR_USERNAME/lol-dashboard.git
   git branch -M main
   git push -u origin main
   ```

4. Go to https://render.com/ → Sign in with GitHub
5. Click "New +" → "Web Service"
6. Find your `lol-dashboard` repo → Click "Connect"
7. Configure:
   - **Name**: `lol-dashboard-api`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: Free
8. Click "Advanced" → Add Environment Variable:
   - **Key**: `RIOT_API_KEY`
   - **Value**: `RGAPI-57192b72-1d16-4368-8467-1ceee10dde38`
9. Click "Create Web Service"
10. Wait 2-3 minutes for deployment
11. **COPY YOUR API URL** (will be like `https://lol-dashboard-api.onrender.com`)

**Option B: Without GitHub (Alternative)**
Use Railway.app instead:
1. Go to https://railway.app/ → Sign up
2. Click "New Project" → "Deploy from GitHub" or upload files manually
3. Same configuration as above
4. Free tier available

---

### Step 2: Deploy Frontend to Vercel (5 minutes)

**Method 1: Via Vercel Dashboard (Easiest)**
1. Go to https://vercel.com/ → Sign up with GitHub/Email
2. Click "Add New..." → "Project"
3. If you used GitHub: Import your `lol-dashboard` repository
4. If no GitHub: Click "Upload" and drag the `frontend` folder

5. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend` (if importing full repo)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `build` (auto-detected)

6. Add Environment Variable:
   - Click "Environment Variables"
   - **Key**: `REACT_APP_API_URL`
   - **Value**: Your Render API URL from Step 1 (e.g., `https://lol-dashboard-api.onrender.com`)

7. Click "Deploy"
8. Wait 1-2 minutes
9. **COPY YOUR DASHBOARD URL** (will be like `https://lol-dashboard-xyz123.vercel.app`)

**Method 2: Via Command Line**
```bash
cd C:\Users\sebao\lol-dashboard\frontend

# Login to Vercel (browser will open)
npx vercel login

# Deploy
npx vercel

# When prompted:
# - Set up project? Yes
# - Project name? lol-dashboard
# - Directory? .
# - Override settings? No

# Add environment variable
npx vercel env add REACT_APP_API_URL production
# Paste your Render backend URL when prompted

# Deploy to production
npx vercel --prod
```

---

## 🎮 Use Your Dashboard

1. Open your Vercel URL: `https://lol-dashboard-xyz123.vercel.app`
2. Enter your squad's Riot IDs:
   - Format: `GameName#TAG`
   - Example: `Faker#KR1`, `Hide on bush#KR1`
3. Click "Get Last Match Stats"
4. See who's MVP and who's the troll! 👑🤡

---

## 🔄 Update Your API Key (When It Expires)

Development API keys expire every 24 hours. To update:

1. Get new key: https://developer.riotgames.com/
2. Go to Render dashboard: https://dashboard.render.com/
3. Click your `lol-dashboard-api` service
4. Go to "Environment" tab
5. Edit `RIOT_API_KEY` → Paste new key
6. Service auto-redeploys (30 seconds)

**Pro tip**: Apply for Production API key (never expires) at https://developer.riotgames.com/

---

## 📱 Share with Friends

Once deployed, just share your Vercel URL:
```
https://your-dashboard.vercel.app
```

Your friends can use it anytime to check match stats!

---

## 🆘 Troubleshooting

**"Build failed on Render"**
- Check logs in Render dashboard
- Ensure `requirements.txt` has correct Python packages
- Make sure `RIOT_API_KEY` is set in environment variables

**"Cannot fetch match data"**
- API key might be expired → Get new one
- Make sure players have played Ranked Flex recently
- Check Riot ID format: `GameName#TAG` (case-sensitive)

**Frontend can't connect to backend**
- Check `REACT_APP_API_URL` is set correctly in Vercel
- Must be your Render backend URL (with https://)
- Redeploy frontend after adding env variable

---

## 📂 Files Location

Everything is in: `C:\Users\sebao\lol-dashboard\`
- Backend: `backend/`
- Frontend: `frontend/`
- API key stored in: `backend/.env` (don't commit this!)

---

Need help? Check:
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Riot API Docs: https://developer.riotgames.com/docs/lol
