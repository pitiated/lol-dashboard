import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import MatchDashboard from './components/MatchDashboard';
import Last5Matches from './components/Last5Matches';
import PlayerComparison from './components/PlayerComparison';

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
  const [last5MatchesData, setLast5MatchesData] = useState<any>(null);
  const [comparisonData, setComparisonData] = useState<any>(null);
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
    setLast5MatchesData(null);
    setComparisonData(null);

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

  const fetchLast5Matches = async () => {
    setLoading(true);
    setError('');
    setMatchData(null);
    setLast5MatchesData(null);
    setComparisonData(null);

    try {
      const filledPlayers = players.filter(p => p.game_name && p.tag_line);

      if (filledPlayers.length === 0) {
        setError('Please enter at least one player');
        setLoading(false);
        return;
      }

      if (filledPlayers.length > 1) {
        setError('Please enter only ONE player for last 5 matches view');
        setLoading(false);
        return;
      }

      const response = await axios.post(`${API_URL}/api/last-5-matches`, {
        players: filledPlayers
      }, {
        headers: apiKey ? { 'X-API-Key': apiKey } : {}
      });

      setLast5MatchesData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Failed to fetch last 5 matches data');
    } finally {
      setLoading(false);
    }
  };

  const fetchComparePlayers = async () => {
    setLoading(true);
    setError('');
    setMatchData(null);
    setLast5MatchesData(null);
    setComparisonData(null);

    try {
      const filledPlayers = players.filter(p => p.game_name && p.tag_line);

      if (filledPlayers.length === 0) {
        setError('Please enter at least one player');
        setLoading(false);
        return;
      }

      if (filledPlayers.length > 5) {
        setError('Please enter a maximum of 5 players for comparison');
        setLoading(false);
        return;
      }

      const response = await axios.post(`${API_URL}/api/compare-players`, {
        players: filledPlayers
      }, {
        headers: apiKey ? { 'X-API-Key': apiKey } : {}
      });

      setComparisonData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Failed to fetch comparison data');
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
        {!matchData && !last5MatchesData && !comparisonData && (
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

            <div className="features-section">
              <h3 className="features-title">Choose Your Analysis:</h3>

              <div className="feature-card">
                <div className="feature-header">
                  <span className="feature-icon">📊</span>
                  <div className="feature-info">
                    <h4>Last Match Stats</h4>
                    <p>See ALL 10 players from one match • Rankings 1-10</p>
                  </div>
                </div>
                <button
                  onClick={fetchMatchStats}
                  disabled={loading}
                  className="fetch-button"
                >
                  {loading ? '⏳ Loading...' : 'Analyze Match'}
                </button>
              </div>

              <div className="feature-card">
                <div className="feature-header">
                  <span className="feature-icon">🏆</span>
                  <div className="feature-info">
                    <h4>Last 5 Matches</h4>
                    <p>Track ONE player's performance • Enter 1 player only</p>
                  </div>
                </div>
                <button
                  onClick={fetchLast5Matches}
                  disabled={loading}
                  className="fetch-button secondary"
                >
                  {loading ? '⏳ Loading...' : 'View History'}
                </button>
              </div>

              <div className="feature-card highlight-card">
                <div className="feature-header">
                  <span className="feature-icon">⚔️</span>
                  <div className="feature-info">
                    <h4>Compare Squad</h4>
                    <p>Compare 1-5 players side-by-side • Find the real MVP!</p>
                  </div>
                </div>
                <button
                  onClick={fetchComparePlayers}
                  disabled={loading}
                  className="fetch-button highlight"
                >
                  {loading ? '⏳ Loading...' : 'Compare Performance'}
                </button>
              </div>
            </div>

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

        {last5MatchesData && (
          <div>
            <button onClick={() => setLast5MatchesData(null)} className="back-button">
              ← Enter New Player
            </button>
            <Last5Matches data={last5MatchesData} />
          </div>
        )}

        {comparisonData && (
          <div>
            <button onClick={() => setComparisonData(null)} className="back-button">
              ← Enter New Players
            </button>
            <PlayerComparison data={comparisonData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
