import React, { useState } from 'react';

const StateArchitectureGuide = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🧭</span>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>
              State Management Architecture: Redux Toolkit + useReducer
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Explore how Redux Toolkit, useReducer (Context & Local), useState, and useRef operate together.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
        >
          {isOpen ? 'Hide Architecture Breakdown ▲' : 'Show Architecture Breakdown ▼'}
        </button>
      </div>

      {isOpen && (
        <div
          style={{
            marginTop: '1.25rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-light)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {/* Card 1: Redux Toolkit */}
          <div
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #7c3aed40',
              backgroundColor: 'rgba(124, 58, 237, 0.05)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>🟣</span>
              <strong style={{ color: '#7c3aed' }}>Redux Toolkit (Global Store)</strong>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              <strong>Used for:</strong> Projects management (<code>projectsSlice</code>) and Global Search / Filter state (<code>filtersSlice</code>).
            </p>
            <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '1.2rem' }}>
              <li><code>useSelector</code> reads active projects & filters.</li>
              <li><code>useDispatch</code> triggers <code>addProject</code>, <code>deleteProject</code>, <code>setSelectedProjectId</code>.</li>
              <li>Auto-syncs project progress whenever tasks update.</li>
            </ul>
          </div>

          {/* Card 2: Context + useReducer */}
          <div
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #05966940',
              backgroundColor: 'rgba(5, 150, 105, 0.05)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>🟢</span>
              <strong style={{ color: '#059669' }}>useReducer + Context API</strong>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              <strong>Used for:</strong> Task Domain State (<code>TaskContext.jsx</code>).
            </p>
            <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '1.2rem' }}>
              <li>Pure <code>taskReducer</code> handles <code>TASK_ADDED</code>, <code>TASK_TOGGLED</code>, <code>TASK_DELETED</code>, <code>TASKS_CLEAR_COMPLETED</code>.</li>
              <li>Broadcaster for cross-component access without external libraries.</li>
              <li>Lazy initialization from <code>localStorage</code>.</li>
            </ul>
          </div>

          {/* Card 3: Component-level useReducer */}
          <div
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #2563eb40',
              backgroundColor: 'rgba(37, 99, 235, 0.05)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>🔵</span>
              <strong style={{ color: '#2563eb' }}>useReducer (Local State Machine)</strong>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              <strong>Used for:</strong> Pomodoro Focus Timer (<code>FocusTimer.jsx</code>).
            </p>
            <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '1.2rem' }}>
              <li>Encapsulates complex transitions: <code>START</code>, <code>PAUSE</code>, <code>RESET</code>, <code>TICK</code>, <code>SET_MODE</code>.</li>
              <li>Eliminates race conditions between <code>timeLeft</code>, <code>status</code>, and <code>mode</code>.</li>
            </ul>
          </div>

          {/* Card 4: useState & useRef */}
          <div
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #d9770640',
              backgroundColor: 'rgba(217, 119, 6, 0.05)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>🟡</span>
              <strong style={{ color: '#d97706' }}>useState & useRef</strong>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              <strong>Used for:</strong> Local UI inputs and mutable references.
            </p>
            <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '1.2rem' }}>
              <li><code>useState</code>: Input fields for typing new task/project names.</li>
              <li><code>useRef</code>: Auto-focusing text input & preserving interval ID across renders without re-rendering.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default StateArchitectureGuide;
