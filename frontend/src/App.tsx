import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import MatchDashboard from './components/MatchDashboard';

interface Player {
  game_name: string;
  tag_line: string;
}

function App() {
  const [players, setPlayers] = useState<Player[]>([
    { game_name: '', tag_line: '' },
    { game_name: '', tag_line: '' },
    { game_name: '', tag_line: '' },
    { game_name: '', tag_line: '' },
    { game_name: '', tag_line: '' }
  ]);
  const [matchData, setMatchData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [apiKey, setApiKey] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const handlePlayerChange = (index: number, field: 'game_name' | 'tag_line', value: string) => {
    const newPlayers = [...players];
    newPlayers[index][field] = value;
    setPlayers(newPlayers);
  };

  const fetchMatchStats = async () => {
    setLoading(true);
    setError('');
    setMatchData(null);

    try {
      const filledPlayers = players.filter(p => p.game_name && p.tag_line);

      if (filledPlayers.length === 0) {
        setError('Please enter at least one player');
        setLoading(false);
        return;
      }

      const response = await axios.post(`${API_URL}/api/match-stats`, {
        players: filledPlayers
      }, {
        headers: apiKey ? { 'X-API-Key': apiKey } : {}
      });

      setMatchData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Failed to fetch match data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏆 LoL Flex Squad Dashboard</h1>
        <p className="subtitle">LAS • Track your team's performance</p>
      </header>

      <div className="container">
        {!matchData && (
          <div className="input-section">
            <div className="api-key-section">
              <label>Riot API Key (optional for local testing):</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="RGAPI-..."
                className="api-key-input"
              />
            </div>

            <h2>Enter Your Squad (Riot IDs)</h2>
            <div className="players-input">
              {players.map((player, index) => (
                <div key={index} className="player-input-row">
                  <span className="player-number">{index + 1}</span>
                  <input
                    type="text"
                    placeholder="Game Name"
                    value={player.game_name}
                    onChange={(e) => handlePlayerChange(index, 'game_name', e.target.value)}
                    className="input-field"
                  />
                  <span className="separator">#</span>
                  <input
                    type="text"
                    placeholder="Tag"
                    value={player.tag_line}
                    onChange={(e) => handlePlayerChange(index, 'tag_line', e.target.value)}
                    className="input-field tag-input"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={fetchMatchStats}
              disabled={loading}
              className="fetch-button"
            >
              {loading ? '⏳ Loading...' : '📊 Get Last Match Stats'}
            </button>

            {error && <div className="error-message">❌ {error}</div>}
          </div>
        )}

        {matchData && (
          <div>
            <button onClick={() => setMatchData(null)} className="back-button">
              ← Enter New Players
            </button>
            <MatchDashboard data={matchData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
