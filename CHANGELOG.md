# 📜 Changelog - LoL Flex Squad Dashboard

All notable changes to this project will be documented in this file.

---

## [v2.1] - 2025-10-10 (Latest)

### 🎨 Major UX Improvements

#### Visual Enhancements
- **Champion Icons in Tables** - Added 32px rounded champion portraits with gold borders
- **Team-Separated Statistics** - Split stats into two separate tables (Team 1 & Team 2)
- **Team Headers with Colors** - Green borders/background for victory, red for defeat
- **Rank Column Added** - New column showing emoji + #number for each player
- **Fixed Ranking Display** - Now shows "😐 #5 OK" clearly (was confusing "50K" before)
- **Larger Emojis** - Increased emoji size to 2.5rem for better visibility
- **Better Spacing** - Improved gaps between rank emoji, number, and label

#### Chart Improvements
- **Team vs Team Comparison** - Changed from individual player charts to team totals
- **Damage Chart** - Now compares Team 1 vs Team 2 total damage (dealt/taken)
- **Gold Chart** - Simplified to show total team gold comparison
- **Clearer Insights** - Easier to see which team performed better at a glance

#### UI Redesign
- **Feature Cards** - Replaced simple buttons with descriptive card layout
- **Large Icons** - Each feature has emoji icon (📊, 🏆, ⚔️)
- **Clear Descriptions** - What each feature does shown upfront
- **Highlighted Compare Squad** - Orange theme for new comparison feature
- **Better Button Labels** - "Analyze Match", "View History", "Compare Performance"

### 🐛 Bug Fixes
- Fixed ranking number display that looked like "50K" instead of "#5"
- Improved visual hierarchy in statistics tables

---

## [v2.0] - 2025-10-10

### 🚀 Major Features

#### Squad Comparison Tool (NEW!)
- Compare 1-5 players' last 5 matches side-by-side
- Overall squad rankings podium (1st 👑, 2nd 🥈, 3rd 🥉)
- Performance badges: MVP count, Top 3 count, Troll count
- Comparison charts: KDA, Win Rate, Damage, Gold, MVP Score
- Detailed stats table comparing all metrics
- Individual match history for each player (compact view)
- New `/api/compare-players` endpoint

#### All 10 Players Display
- Match stats now shows ALL 10 players (both teams)
- No longer limited to searched players only
- Full match overview with both teams visible

#### MVP Rankings Expanded
- Rankings expanded from 1-5 to 1-10
- New ranking emojis:
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

#### Team Breakdown Tables
- Separate display for Team 1 vs Team 2
- Win/loss indicators for each team
- Quick team-based stats table

### 🐛 Bug Fixes
- Fixed API key expiration handling
- Updated to new Riot API key system
- Improved error handling for network errors
- Better error messages for users

### 🎨 UI Improvements
- Orange gradient button for Compare Squad feature
- Color-coded win/loss indicators throughout
- Performance badges (MVP, Top 3, Troll)
- Podium-style rankings display
- Responsive card-based layout

---

## [v1.0] - 2025-10-07

### 🎉 Initial Release

#### Core Features
- **Last Match Stats** - Analyze ranked flex matches with MVP rankings
- **Last 5 Matches** - Track single player performance over 5 games
- **MVP Scoring Algorithm** - Weighted formula:
  - KDA × 30%
  - Team Damage % × 20%
  - Gold Per Minute × 15%
  - Vision Score × 10%
  - Kill Participation × 25%

#### Statistics Displayed
- Full KDA (Kills/Deaths/Assists)
- CS (Creep Score)
- Gold earned
- Damage dealt to champions
- Damage taken
- Vision score
- Kill participation percentage
- Item builds with images
- Ranked tier display

#### Technical Implementation
- FastAPI backend deployed on Render
- React TypeScript frontend deployed on Vercel
- Riot Games API integration (LAS server)
- Real-time match data fetching
- Responsive design

#### API Endpoints
- `POST /api/match-stats` - Get last match stats
- `POST /api/last-5-matches` - Get 5-match history for one player

---

## 🔮 Future Plans

### Planned Features
- [ ] Performance trends over time (weekly/monthly graphs)
- [ ] Champion mastery display
- [ ] Team composition analysis (synergy checker)
- [ ] Save favorite player groups (localStorage)
- [ ] Export stats as image/PDF
- [ ] Dark/light theme toggle
- [ ] Discord bot integration
- [ ] Live game tracking
- [ ] Custom ranking weights (user-adjustable MVP formula)
- [ ] Multi-region support (currently LAS only)
- [ ] Champion-specific stats

### Potential Improvements
- Better mobile responsiveness
- Loading animations
- Player avatars
- Hover tooltips for stat explanations
- Filter/sort functionality in tables
- Match search by date/time
- Performance caching to reduce API calls
- Unit tests
- Rate limit optimization

---

## 📊 Version Summary

| Version | Date | Key Feature |
|---------|------|-------------|
| v2.1 | Oct 10, 2025 | UX improvements, team charts, champion icons |
| v2.0 | Oct 10, 2025 | Squad comparison, 10-player rankings |
| v1.0 | Oct 7, 2025 | Initial release with MVP rankings |

---

## 🙏 Credits

Built with ❤️ for the LAS League of Legends community!

**Tech Stack:**
- Backend: Python, FastAPI, Riot Games API
- Frontend: React, TypeScript, Recharts
- Hosting: Render (backend), Vercel (frontend)
- Version Control: Git, GitHub

**Special Thanks:**
- Riot Games for the API
- The LAS Flex Squad for being guinea pigs
- Claude Code for development assistance

---

**For detailed deployment info, see:** [DEPLOY-NOW.md](DEPLOY-NOW.md)

**For quick reference, see:** [QUICK-START.md](QUICK-START.md)

**For ongoing updates, see:** [UPDATES-TODO.md](UPDATES-TODO.md)
