import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './PlayerComparison.css';

interface Match {
  matchId: string;
  champion: string;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  win: boolean;
  mvpScore: number;
  ranking: number;
  gameCreation: string;
}

interface Performance {
  mvpCount: number;
  top3Count: number;
  trollCount: number;
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

interface PlayerStats {
  player: {
    gameName: string;
    tagLine: string;
    rank?: {
      tier: string;
      division: string;
      lp: number;
    };
  };
  averages: Averages;
  performance: Performance;
  totalGames: number;
  matches: Match[];
}

interface ComparisonData {
  players: PlayerStats[];
  comparedPlayers: number;
}

interface Props {
  data: ComparisonData;
}

const PlayerComparison: React.FC<Props> = ({ data }) => {
  const getRankingEmoji = (ranking: number) => {
    switch (ranking) {
      case 1: return '👑';
      case 2: return '🥈';
      case 3: return '🥉';
      case 4: return '😊';
      case 5: return '😐';
      case 6: return '😕';
      case 7: return '😬';
      case 8: return '😢';
      case 9: return '💩';
      case 10: return '🤡';
      default: return '';
    }
  };

  // Prepare chart data
  const kdaComparison = data.players.map(p => ({
    name: p.player.gameName,
    KDA: p.averages.kda,
    'Win Rate': p.averages.winRate / 10, // Scale down for better visualization
  }));

  const damageComparison = data.players.map(p => ({
    name: p.player.gameName,
    Damage: p.averages.damage,
    Gold: p.averages.gold / 10, // Scale down
  }));

  const mvpComparison = data.players.map(p => ({
    name: p.player.gameName,
    'MVP Score': p.averages.mvpScore,
    'MVP Count': p.performance.mvpCount * 100, // Scale up for visibility
  }));

  return (
    <div className="player-comparison">
      <div className="comparison-header">
        <h2>🏆 Squad Performance Comparison</h2>
        <p className="subtitle">Last 5 Ranked Flex Matches • {data.comparedPlayers} Players</p>
      </div>

      {/* Overall Rankings */}
      <div className="overall-rankings">
        <h3>📊 Overall Squad Rankings (By Avg MVP Score)</h3>
        <div className="rankings-podium">
          {data.players.map((playerStat, index) => (
            <div
              key={`${playerStat.player.gameName}-${index}`}
              className={`podium-card rank-${index + 1}`}
            >
              <div className="podium-rank">
                {index === 0 && '👑'}
                {index === 1 && '🥈'}
                {index === 2 && '🥉'}
                {index > 2 && `#${index + 1}`}
              </div>
              <div className="podium-player">
                <h4>{playerStat.player.gameName}#{playerStat.player.tagLine}</h4>
                {playerStat.player.rank && (
                  <p className="rank-display">
                    {playerStat.player.rank.tier} {playerStat.player.rank.division} • {playerStat.player.rank.lp} LP
                  </p>
                )}
              </div>
              <div className="podium-stats">
                <div className="stat">
                  <span className="stat-label">Avg MVP Score</span>
                  <span className="stat-value highlight">{playerStat.averages.mvpScore}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Win Rate</span>
                  <span className={`stat-value ${playerStat.averages.winRate >= 50 ? 'good' : 'bad'}`}>
                    {playerStat.averages.winRate}%
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-label">Avg KDA</span>
                  <span className="stat-value">{playerStat.averages.kda}</span>
                </div>
              </div>
              <div className="performance-badges">
                <span className="badge mvp" title="Times ranked #1">
                  👑 {playerStat.performance.mvpCount}x MVP
                </span>
                <span className="badge top3" title="Times ranked top 3">
                  🥉 {playerStat.performance.top3Count}x Top 3
                </span>
                {playerStat.performance.trollCount > 0 && (
                  <span className="badge troll" title="Times ranked #10">
                    🤡 {playerStat.performance.trollCount}x Troll
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Charts */}
      <div className="comparison-charts">
        <div className="chart-container">
          <h3>📈 KDA & Win Rate Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={kdaComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="KDA" fill="#4ecdc4" />
              <Bar dataKey="Win Rate" fill="#ffd93d" name="Win Rate (x10)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>💰 Damage & Gold Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={damageComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Damage" fill="#ff6b6b" />
              <Bar dataKey="Gold" fill="#95e1d3" name="Gold (÷10)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>🏆 MVP Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mvpComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="MVP Score" fill="#ffd700" />
              <Bar dataKey="MVP Count" fill="#ff8c00" name="MVP Count (x100)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Stats Table */}
      <div className="detailed-comparison">
        <h3>📋 Detailed Stats Breakdown</h3>
        <div className="stats-table-container">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Player</th>
                <th>Games</th>
                <th>W/L</th>
                <th>K/D/A</th>
                <th>KDA</th>
                <th>CS</th>
                <th>Gold</th>
                <th>Damage</th>
                <th>Vision</th>
                <th>MVP Score</th>
              </tr>
            </thead>
            <tbody>
              {data.players.map((playerStat, index) => (
                <tr key={`${playerStat.player.gameName}-${index}`} className={index === 0 ? 'best' : ''}>
                  <td>
                    <strong>{playerStat.player.gameName}#{playerStat.player.tagLine}</strong>
                  </td>
                  <td>{playerStat.totalGames}</td>
                  <td>
                    <span className={playerStat.averages.winRate >= 50 ? 'win-rate good' : 'win-rate bad'}>
                      {playerStat.averages.winRate}%
                    </span>
                  </td>
                  <td className="kda-cell">
                    {playerStat.averages.kills}/{playerStat.averages.deaths}/{playerStat.averages.assists}
                  </td>
                  <td>
                    <span className={playerStat.averages.kda >= 3 ? 'kda-high' : playerStat.averages.kda >= 2 ? 'kda-med' : 'kda-low'}>
                      {playerStat.averages.kda}
                    </span>
                  </td>
                  <td>{playerStat.averages.cs}</td>
                  <td>{playerStat.averages.gold.toLocaleString()}</td>
                  <td>{playerStat.averages.damage.toLocaleString()}</td>
                  <td>{playerStat.averages.visionScore}</td>
                  <td><strong className="highlight">{playerStat.averages.mvpScore}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Match History for Each Player */}
      <div className="match-histories">
        <h3>🎮 Individual Match Histories</h3>
        <div className="histories-grid">
          {data.players.map((playerStat, playerIndex) => (
            <div key={`history-${playerIndex}`} className="player-history">
              <h4>{playerStat.player.gameName}#{playerStat.player.tagLine}</h4>
              <div className="matches-list-compact">
                {playerStat.matches.map((match, matchIndex) => (
                  <div
                    key={match.matchId}
                    className={`match-row-compact ${match.win ? 'win' : 'loss'}`}
                  >
                    <span className="match-num">#{matchIndex + 1}</span>
                    <span className="match-champ">{match.champion}</span>
                    <span className="match-kda">{match.kills}/{match.deaths}/{match.assists}</span>
                    <span className={`match-rank rank-${match.ranking}`}>
                      {getRankingEmoji(match.ranking)} #{match.ranking}
                    </span>
                    <span className="match-result">{match.win ? 'W' : 'L'}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerComparison;
