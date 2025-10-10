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
  teamId?: number;
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

  const getRankingLabel = (ranking: number) => {
    if (ranking === 1) return 'MVP';
    if (ranking === 2) return 'Great';
    if (ranking === 3) return 'Good';
    if (ranking <= 5) return 'OK';
    if (ranking <= 7) return 'Meh';
    if (ranking <= 9) return 'Bad';
    if (ranking === 10) return 'Troll';
    return '';
  };

  // Separate players by team
  const team1 = data.players.filter(p => p.teamId === 100);
  const team2 = data.players.filter(p => p.teamId === 200);
  const team1Won = team1.length > 0 ? team1[0].win : false;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleString();
  };

  // Aggregate team stats for charts
  const team1TotalDamage = team1.reduce((sum, p) => sum + p.damage, 0);
  const team2TotalDamage = team2.reduce((sum, p) => sum + p.damage, 0);
  const team1TotalDamageTaken = team1.reduce((sum, p) => sum + p.damageTaken, 0);
  const team2TotalDamageTaken = team2.reduce((sum, p) => sum + p.damageTaken, 0);
  const team1TotalGold = team1.reduce((sum, p) => sum + p.gold, 0);
  const team2TotalGold = team2.reduce((sum, p) => sum + p.gold, 0);

  const teamDamageData = [
    {
      team: 'Team 1',
      'Damage Dealt': team1TotalDamage,
      'Damage Taken': team1TotalDamageTaken
    },
    {
      team: 'Team 2',
      'Damage Dealt': team2TotalDamage,
      'Damage Taken': team2TotalDamageTaken
    }
  ];

  const teamGoldData = [
    {
      team: 'Team 1',
      'Total Gold': team1TotalGold
    },
    {
      team: 'Team 2',
      'Total Gold': team2TotalGold
    }
  ];

  return (
    <div className="dashboard">
      <div className="match-header">
        <h2>Match Results</h2>
        <div className="match-info">
          <span>📅 {formatDate(data.gameCreation)}</span>
          <span>⏱️ {formatDuration(data.gameDuration)}</span>
          <span>🎮 {data.gameMode}</span>
        </div>
      </div>

      <div className="rankings-section">
        <h3>🏆 Overall MVP Rankings (1-10)</h3>
        <div className="rankings-grid">
          {data.players.slice(0, 5).map((player) => (
            <div key={`${player.gameName}-${player.ranking}`} className={`ranking-card rank-${player.ranking}`}>
              <div className="rank-badge">
                <span className="rank-emoji">{getRankingEmoji(player.ranking)}</span>
                <span className="rank-number">#{player.ranking}</span>
                <span className="rank-label">{getRankingLabel(player.ranking)}</span>
              </div>
              <div className="player-info">
                <h4>{player.gameName}#{player.tagLine}</h4>
                <p className="champion">{player.champion}</p>
                <p className={`team-badge ${player.win ? 'win' : 'loss'}`}>
                  {player.win ? '🎉 Victory' : '💀 Defeat'}
                </p>
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
        <h4 style={{marginTop: '20px', color: '#888'}}>Bottom 5:</h4>
        <div className="rankings-grid">
          {data.players.slice(5, 10).map((player) => (
            <div key={`${player.gameName}-${player.ranking}`} className={`ranking-card rank-${player.ranking}`}>
              <div className="rank-badge">
                <span className="rank-emoji">{getRankingEmoji(player.ranking)}</span>
                <span className="rank-number">#{player.ranking}</span>
                <span className="rank-label">{getRankingLabel(player.ranking)}</span>
              </div>
              <div className="player-info">
                <h4>{player.gameName}#{player.tagLine}</h4>
                <p className="champion">{player.champion}</p>
                <p className={`team-badge ${player.win ? 'win' : 'loss'}`}>
                  {player.win ? '🎉 Victory' : '💀 Defeat'}
                </p>
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

      <div className="teams-section">
        <h3>📋 Team Breakdown</h3>
        <div className="teams-container">
          <div className={`team-box ${team1Won ? 'win' : 'loss'}`}>
            <h4>{team1Won ? '🎉 TEAM 1 - VICTORY' : '💀 TEAM 1 - DEFEAT'}</h4>
            <table className="team-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Champion</th>
                  <th>K/D/A</th>
                  <th>MVP Score</th>
                </tr>
              </thead>
              <tbody>
                {team1.map((player) => (
                  <tr key={`${player.gameName}-${player.tagLine}`}>
                    <td>
                      <span className="rank-emoji">{getRankingEmoji(player.ranking)}</span>
                      #{player.ranking}
                    </td>
                    <td><strong>{player.gameName}#{player.tagLine}</strong></td>
                    <td>{player.champion}</td>
                    <td>{player.kills}/{player.deaths}/{player.assists}</td>
                    <td>{player.mvpScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`team-box ${!team1Won ? 'win' : 'loss'}`}>
            <h4>{!team1Won ? '🎉 TEAM 2 - VICTORY' : '💀 TEAM 2 - DEFEAT'}</h4>
            <table className="team-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Champion</th>
                  <th>K/D/A</th>
                  <th>MVP Score</th>
                </tr>
              </thead>
              <tbody>
                {team2.map((player) => (
                  <tr key={`${player.gameName}-${player.tagLine}`}>
                    <td>
                      <span className="rank-emoji">{getRankingEmoji(player.ranking)}</span>
                      #{player.ranking}
                    </td>
                    <td><strong>{player.gameName}#{player.tagLine}</strong></td>
                    <td>{player.champion}</td>
                    <td>{player.kills}/{player.deaths}/{player.assists}</td>
                    <td>{player.mvpScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h3>📊 Player Statistics</h3>

        {/* Team 1 Stats */}
        <div className="team-stats-section">
          <h4 className={team1Won ? 'team-header win' : 'team-header loss'}>
            {team1Won ? '🎉 TEAM 1 - VICTORY' : '💀 TEAM 1 - DEFEAT'}
          </h4>
          <div className="stats-table-container">
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Champion</th>
                  <th>K/D/A</th>
                  <th>KDA</th>
                  <th>CS</th>
                  <th>Gold</th>
                  <th>DMG</th>
                  <th>Vision</th>
                  <th>KP%</th>
                </tr>
              </thead>
              <tbody>
                {team1.map((player) => (
                  <tr key={player.gameName}>
                    <td>
                      <span className="rank-emoji">{getRankingEmoji(player.ranking)}</span>
                      <span className="rank-text">#{player.ranking}</span>
                    </td>
                    <td>
                      <strong>{player.gameName}</strong>
                    </td>
                    <td>
                      <div className="champion-cell">
                        <img
                          src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${player.champion}.png`}
                          alt={player.champion}
                          className="champion-icon"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <span>{player.champion}</span>
                      </div>
                    </td>
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
                    <td>{player.visionScore}</td>
                    <td>{player.killParticipation}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Team 2 Stats */}
        <div className="team-stats-section">
          <h4 className={!team1Won ? 'team-header win' : 'team-header loss'}>
            {!team1Won ? '🎉 TEAM 2 - VICTORY' : '💀 TEAM 2 - DEFEAT'}
          </h4>
          <div className="stats-table-container">
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Champion</th>
                  <th>K/D/A</th>
                  <th>KDA</th>
                  <th>CS</th>
                  <th>Gold</th>
                  <th>DMG</th>
                  <th>Vision</th>
                  <th>KP%</th>
                </tr>
              </thead>
              <tbody>
                {team2.map((player) => (
                  <tr key={player.gameName}>
                    <td>
                      <span className="rank-emoji">{getRankingEmoji(player.ranking)}</span>
                      <span className="rank-text">#{player.ranking}</span>
                    </td>
                    <td>
                      <strong>{player.gameName}</strong>
                    </td>
                    <td>
                      <div className="champion-cell">
                        <img
                          src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${player.champion}.png`}
                          alt={player.champion}
                          className="champion-icon"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <span>{player.champion}</span>
                      </div>
                    </td>
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
                    <td>{player.visionScore}</td>
                    <td>{player.killParticipation}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
          <h3>⚔️ Team Damage Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamDamageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="team" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Damage Dealt" fill="#ff6b6b" />
              <Bar dataKey="Damage Taken" fill="#4ecdc4" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>💰 Team Gold Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamGoldData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="team" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Total Gold" fill="#ffd93d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MatchDashboard;
