import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProjects } from '../store/slices/projectsSlice';
import { selectActiveTab, setActiveTab } from '../store/slices/filtersSlice';
import { useTasks } from '../context/TaskContext';

const Sidebar = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);
  const projects = useSelector(selectAllProjects);
  const { tasks } = useTasks();

  const pendingTaskCount = tasks.filter(t => !t.completed).length;

  const navItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Projects', icon: '📁', count: projects.length },
    { name: 'Tasks', icon: '✅', count: pendingTaskCount },
    { name: 'Focus', icon: '⏱️' },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <span role="img" aria-label="logo">🌊</span> FlowState
      </div>

      <ul className="nav-menu">
        {navItems.map((item) => {
          const isActive = activeTab === item.name;
          return (
            <li
              key={item.name}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => dispatch(setActiveTab(item.name))}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </span>
              {item.count !== undefined && (
                <span
                  style={{
                    backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--border-light)',
                    color: isActive ? 'white' : 'var(--text-muted)',
                    borderRadius: '10px',
                    padding: '0.1rem 0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  {item.count}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          <strong>State Stack:</strong>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.75rem' }}>
          <span style={{ color: '#7c3aed' }}>● Redux Toolkit</span>
          <span style={{ color: '#059669' }}>● useReducer (Context)</span>
          <span style={{ color: '#2563eb' }}>● useReducer (Timer)</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
