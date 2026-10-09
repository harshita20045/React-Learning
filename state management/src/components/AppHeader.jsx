import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';

const AppHeader = () => {
  const { isDark, toggleTheme } = useTheme();
  
  // Stage 8: Consume tasks directly from context!
  const { tasks } = useTasks();
  const completedTaskCount = tasks.filter(t => t.completed).length;

  return (
    <header className="app-header">
      <div className="header-title">Dashboard</div>
      <div className="header-actions">
        <button 
          onClick={toggleTheme} 
          className="btn btn-secondary" 
          style={{ padding: '0.25rem 0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>

        {completedTaskCount > 0 && (
          <span style={{ fontSize: '0.875rem', color: 'var(--success)', fontWeight: 500 }}>
            🎉 {completedTaskCount} tasks completed!
          </span>
        )}
        <div className="avatar">JS</div>
      </div>
    </header>
  );
};

export default AppHeader;
