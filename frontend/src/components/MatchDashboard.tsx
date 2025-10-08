import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import './MatchDashboard.css';

interface PlayerStats {
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
  damageTaken: number;
  visionScore: number;
  items: number[];
  win: boolean;
  mvpScore: number;
  ranking: number;
  goldPerMinute: number;
  damagePerMinute: number;
  killParticipation: number;
  rank?: {
    tier: string;
    division: string;
    lp: number;
  };
}

interface MatchData {
  matchId: string;
  gameCreation: string;
  gameDuration: number;
  gameMode: string;
  players: PlayerStats[];
}

interface Props {
  data: MatchData;
}

const MatchDashboard: React.FC<Props> = ({ data }) => {
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
    return new Date(isoDate).toLocaleString();
  };

  const damageData = data.players.map(p => ({
    name: p.gameName,
    damage: p.damage,
    damageTaken: p.damageTaken
  }));

  const goldData = data.players.map(p => ({
    name: p.gameName,
    gold: p.gold,
    gpm: p.goldPerMinute
  }));

  return (
    <div className="dashboard">
      <div className="match-header">
        <h2>{data.players[0]?.win ? '🎉 Victory' : '💀 Defeat'}</h2>
        <div className="match-info">
          <span>📅 {formatDate(data.gameCreation)}</span>
          <span>⏱️ {formatDuration(data.gameDuration)}</span>
          <span>🎮 {data.gameMode}</span>
        </div>
      </div>

      <div className="rankings-section">
        <h3>🏆 Performance Rankings</h3>
        <div className="rankings-grid">
          {data.players.map((player) => (
            <div key={player.gameName} className={`ranking-card rank-${player.ranking}`}>
              <div className="rank-badge">
                <span className="rank-emoji">{getRankingEmoji(player.ranking)}</span>
                <span className="rank-label">{getRankingLabel(player.ranking)}</span>
              </div>
              <div className="player-info">
                <h4>{player.gameName}#{player.tagLine}</h4>
                <p className="champion">{player.champion}</p>
                {player.rank && (
                  <p className="rank-display">
                    {player.rank.tier} {player.rank.division} • {player.rank.lp} LP
                  </p>
                )}
              </div>
              <div className="mvp-score">
                MVP Score: <strong>{player.mvpScore}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-section">
        <h3>📊 Player Statistics</h3>
        <div className="stats-table-container">
          <table className="stats-table">
            <thead>
              <tr>
                <th>Player</th>
                <th>Champion</th>
                <th>K/D/A</th>
                <th>KDA</th>
                <th>CS</th>
                <th>Gold</th>
                <th>DMG</th>
                <th>DMG Taken</th>
                <th>Vision</th>
                <th>KP%</th>
              </tr>
            </thead>
            <tbody>
              {data.players.map((player) => (
                <tr key={player.gameName}>
                  <td>
                    <strong>{player.gameName}</strong>
                  </td>
                  <td>{player.champion}</td>
                  <td>
                    <span className="kda-detail">
                      {player.kills}/{player.deaths}/{player.assists}
                    </span>
                  </td>
                  <td>
                    <span className={player.kda >= 3 ? 'kda-high' : player.kda >= 2 ? 'kda-med' : 'kda-low'}>
                      {player.kda}
                    </span>
                  </td>
                  <td>{player.cs}</td>
                  <td>{player.gold.toLocaleString()}</td>
                  <td>{player.damage.toLocaleString()}</td>
                  <td>{player.damageTaken.toLocaleString()}</td>
                  <td>{player.visionScore}</td>
                  <td>{player.killParticipation}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="items-section">
        <h3>🛡️ Item Builds</h3>
        <div className="items-grid">
          {data.players.map((player) => (
            <div key={player.gameName} className="item-build">
              <h4>{player.gameName}</h4>
              <div className="items-display">
                {player.items.map((itemId, idx) => (
                  itemId !== 0 && (
                    <div key={idx} className="item-slot">
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/${itemId}.png`}
                        alt={`Item ${itemId}`}
                        className="item-icon"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )
                ))}
              </div>
              <p className="item-stats">
                💰 {player.goldPerMinute} GPM • 💥 {Math.round(player.damagePerMinute)} DPM
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h3>⚔️ Damage Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={damageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="damage" fill="#ff6b6b" name="Damage Dealt" />
              <Bar dataKey="damageTaken" fill="#4ecdc4" name="Damage Taken" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>💰 Gold Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={goldData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="gold" stroke="#ffd93d" name="Total Gold" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="gpm" stroke="#6bcf7f" name="Gold/Min" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MatchDashboard;
