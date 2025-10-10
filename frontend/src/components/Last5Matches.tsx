import React from 'react';
import './Last5Matches.css';

interface PlayerInMatch {
  gameName: string;
  tagLine: string;
  champion: string;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  cs: number;
  gold: number;
  damage: number;
  visionScore: number;
  win: boolean;
  mvpScore: number;
  ranking: number;
  items: number[];
}

interface Match {
  matchId: string;
  gameCreation: string;
  gameDuration: number;
  gameMode: string;
  win: boolean;
  players: PlayerInMatch[];
  requestedPlayer: PlayerInMatch;
}

interface Averages {
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  cs: number;
  gold: number;
  damage: number;
  visionScore: number;
  mvpScore: number;
  winRate: number;
}

interface Last5MatchesData {
  player: {
    gameName: string;
    tagLine: string;
    rank?: {
      tier: string;
      division: string;
      lp: number;
    };
  };
  matches: Match[];
  averages: Averages;
  totalGames: number;
}

interface Props {
  data: Last5MatchesData;
}

const Last5Matches: React.FC<Props> = ({ data }) => {
  const getRankingEmoji = (ranking: number) => {
    switch (ranking) {
      case 1: return '👑';
      case 2: return '🥈';
      case 3: return '🥉';
      case 4: return '😐';
      case 5: return '🤡';
      default: return '';
    }
  };

  const getRankingLabel = (ranking: number) => {
    switch (ranking) {
      case 1: return 'MVP';
      case 2: return 'Great';
      case 3: return 'Good';
      case 4: return 'Meh';
      case 5: return 'Troll';
      default: return '';
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="last-5-matches">
      <div className="player-header">
        <h2>
          {data.player.gameName}#{data.player.tagLine}
        </h2>
        {data.player.rank && (
          <div className="rank-badge">
            {data.player.rank.tier} {data.player.rank.division} ({data.player.rank.lp} LP)
          </div>
        )}
      </div>

      <div className="averages-section">
        <h3>📊 Last {data.totalGames} Games - Average Performance</h3>
        <div className="averages-grid">
          <div className="avg-stat">
            <span className="stat-label">KDA</span>
            <span className="stat-value">{data.averages.kda}</span>
            <span className="stat-detail">
              {data.averages.kills}/{data.averages.deaths}/{data.averages.assists}
            </span>
          </div>
          <div className="avg-stat">
            <span className="stat-label">Win Rate</span>
            <span className="stat-value">{data.averages.winRate}%</span>
          </div>
          <div className="avg-stat">
            <span className="stat-label">CS</span>
            <span className="stat-value">{data.averages.cs}</span>
          </div>
          <div className="avg-stat">
            <span className="stat-label">Damage</span>
            <span className="stat-value">{data.averages.damage.toLocaleString()}</span>
          </div>
          <div className="avg-stat">
            <span className="stat-label">Gold</span>
            <span className="stat-value">{data.averages.gold.toLocaleString()}</span>
          </div>
          <div className="avg-stat">
            <span className="stat-label">Vision</span>
            <span className="stat-value">{data.averages.visionScore}</span>
          </div>
          <div className="avg-stat">
            <span className="stat-label">MVP Score</span>
            <span className="stat-value">{data.averages.mvpScore}</span>
          </div>
        </div>
      </div>

      <div className="matches-list">
        <h3>🎮 Match History</h3>
        {data.matches.map((match, index) => (
          <div key={match.matchId} className={`match-card ${match.win ? 'win' : 'loss'}`}>
            <div className="match-header-row">
              <div className="match-number">Game #{index + 1}</div>
              <div className={`match-result ${match.win ? 'win' : 'loss'}`}>
                {match.win ? '🎉 Victory' : '💀 Defeat'}
              </div>
              <div className="match-time">
                📅 {formatDate(match.gameCreation)} • ⏱️ {formatDuration(match.gameDuration)}
              </div>
            </div>

            <div className="match-player-performance">
              <div className="player-rank">
                <span className="rank-emoji">{getRankingEmoji(match.requestedPlayer.ranking)}</span>
                <span className="rank-label">{getRankingLabel(match.requestedPlayer.ranking)}</span>
              </div>
              <div className="player-stats-row">
                <span className="champion">{match.requestedPlayer.champion}</span>
                <span className="kda">
                  {match.requestedPlayer.kills}/{match.requestedPlayer.deaths}/{match.requestedPlayer.assists}
                  <span className="kda-ratio">({match.requestedPlayer.kda} KDA)</span>
                </span>
                <span className="cs">{match.requestedPlayer.cs} CS</span>
                <span className="dmg">{match.requestedPlayer.damage.toLocaleString()} DMG</span>
                <span className="mvp-score">MVP: {match.requestedPlayer.mvpScore}</span>
              </div>
            </div>

            <div className="teammates-section">
              <h4>Team Performance (MVP → Troll):</h4>
              <div className="teammates-list">
                {match.players.map((player, idx) => (
                  <div
                    key={idx}
                    className={`teammate-row ${player.gameName === data.player.gameName && player.tagLine === data.player.tagLine ? 'highlighted' : ''}`}
                  >
                    <span className="teammate-rank">
                      {getRankingEmoji(player.ranking)} {player.ranking}
                    </span>
                    <span className="teammate-name">
                      {player.gameName}#{player.tagLine}
                    </span>
                    <span className="teammate-champion">{player.champion}</span>
                    <span className="teammate-kda">
                      {player.kills}/{player.deaths}/{player.assists}
                    </span>
                    <span className="teammate-mvp">MVP: {player.mvpScore}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Last5Matches;
