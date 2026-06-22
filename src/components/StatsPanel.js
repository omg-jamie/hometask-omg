import React from 'react';
import PropTypes from 'prop-types';
import './StatsPanel.css';

const StatsPanel = ({ stats, onMine }) => {
  if (!stats) return null;

  return (
    <div className="stats-panel">
      <h2 className="panel-title">Blockchain Stats</h2>

      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-label">Chain Length</div>
          <div className="stat-value">{stats.chainLength}</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">Pending Transactions</div>
          <div className="stat-value">{stats.pendingTransactions}</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">Difficulty</div>
          <div className="stat-value">{stats.difficulty}</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">Mining Reward</div>
          <div className="stat-value">{stats.miningReward}</div>
        </div>

        <div className="stat-item status">
          <div className="stat-label">Chain Status</div>
          <div className={`stat-value ${stats.isValid ? 'valid' : 'invalid'}`}>
            {stats.isValid ? '✓ Valid' : '✗ Invalid'}
          </div>
        </div>
      </div>

      <button className="mine-button" onClick={onMine}>
        ⛏️ Mine Block
      </button>
    </div>
  );
};

export default StatsPanel;

StatsPanel.propTypes = {
  stats: PropTypes.shape({
    chainLength: PropTypes.number.isRequired,
    pendingTransactions: PropTypes.number.isRequired,
    difficulty: PropTypes.number.isRequired,
    miningReward: PropTypes.number.isRequired,
    isValid: PropTypes.bool.isRequired,
  }).isRequired,
  onMine: PropTypes.func.isRequired,
};
