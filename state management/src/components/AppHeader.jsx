import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';
import { selectActiveTab } from '../store/slices/filtersSlice';

const AppHeader = () => {
  const { isDark, toggleTheme } = useTheme();
  const activeTab = useSelector(selectActiveTab);
  
  // Tasks state from useReducer (TaskContext)
  const { tasks } = useTasks();
  const completedTaskCount = tasks.filter(t => t.completed).length;

  return (
    <header className="app-header">
      <div className="header-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span>{activeTab || 'Dashboard'}</span>
      </div>
      <div className="header-actions">
        <button 
          onClick={toggleTheme} 
          className="btn btn-secondary" 
          style={{ padding: '0.25rem 0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-label="Toggle dark/light theme"
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
