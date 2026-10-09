import React from 'react';

const StatCard = ({ title, value, unit }) => {
  return (
    <div className="stat-card">
      <div className="stat-title">{title}</div>
      <div className="stat-value">
        {value} {unit && <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>{unit}</span>}
      </div>
    </div>
  );
};

export default StatCard;
