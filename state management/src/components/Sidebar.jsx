import React from 'react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span role="img" aria-label="logo">🌊</span> FlowState
      </div>
      <ul className="nav-menu">
        <li className="nav-item active">Dashboard</li>
        <li className="nav-item">Projects</li>
        <li className="nav-item">Tasks</li>
        <li className="nav-item">Focus</li>
        <li className="nav-item">Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
