import React, { useReducer, useEffect, useRef } from 'react';

// ============================================================================
// COMPONENT-LEVEL useReducer: Pomodoro Focus Session State Machine
// ============================================================================
// Why useReducer here?
// The timer has interdependent state: mode, timeLeft, status, and session counts.
// Updating one often requires synchronously recalculating the others.
// An action-based reducer cleanly eliminates synchronization bugs!

const DURATIONS = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const initialTimerState = {
  mode: 'work',         // 'work' | 'shortBreak' | 'longBreak'
  status: 'idle',       // 'idle' | 'running' | 'paused'
  timeLeft: DURATIONS.work,
  completedSessions: 0,
};

export const timerReducer = (state, action) => {
  switch (action.type) {
    case 'START':
      return { ...state, status: 'running' };

    case 'PAUSE':
      return { ...state, status: 'paused' };

    case 'RESET':
      return {
        ...state,
        status: 'idle',
        timeLeft: DURATIONS[state.mode],
      };

    case 'SET_MODE': {
      const newMode = action.payload;
      return {
        ...state,
        mode: newMode,
        status: 'idle',
        timeLeft: DURATIONS[newMode],
      };
    }

    case 'TICK': {
      if (state.timeLeft <= 1) {
        // Transition when timer finishes
        const isWorkSession = state.mode === 'work';
        return {
          ...state,
          status: 'idle',
          mode: isWorkSession ? 'shortBreak' : 'work',
          timeLeft: isWorkSession ? DURATIONS.shortBreak : DURATIONS.work,
          completedSessions: isWorkSession
            ? state.completedSessions + 1
            : state.completedSessions,
        };
      }
      return { ...state, timeLeft: state.timeLeft - 1 };
    }

    default:
      return state;
  }
};

const FocusTimer = () => {
  const [state, dispatch] = useReducer(timerReducer, initialTimerState);
  const intervalRef = useRef(null);

  // Interval effect synchronized with state.status
  useEffect(() => {
    if (state.status === 'running') {
      intervalRef.current = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.status]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const getStatusColor = () => {
    if (state.status === 'running') return 'var(--accent-primary)';
    if (state.status === 'paused') return 'var(--warning)';
    return 'var(--text-muted)';
  };

  return (
    <div className="stat-card timer-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>Focus Session</h3>
        <span
          className="badge"
          style={{
            backgroundColor: 'var(--bg-accent-light)',
            color: 'var(--accent-primary)',
            fontSize: '0.75rem',
            letterSpacing: '0.02em',
          }}
        >
          ⚡ useReducer State Machine
        </span>
      </div>

      {/* Mode Selector */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
        <button
          type="button"
          onClick={() => dispatch({ type: 'SET_MODE', payload: 'work' })}
          className={`btn ${state.mode === 'work' ? '' : 'btn-secondary'}`}
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
        >
          Work (25m)
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: 'SET_MODE', payload: 'shortBreak' })}
          className={`btn ${state.mode === 'shortBreak' ? '' : 'btn-secondary'}`}
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
        >
          Short Break (5m)
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: 'SET_MODE', payload: 'longBreak' })}
          className={`btn ${state.mode === 'longBreak' ? '' : 'btn-secondary'}`}
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
        >
          Long Break (15m)
        </button>
      </div>

      {/* Time Display */}
      <div
        style={{
          fontSize: '3.25rem',
          fontWeight: 800,
          fontFamily: 'monospace',
          color: getStatusColor(),
          letterSpacing: '2px',
          margin: '0.5rem 0',
        }}
      >
        {formatTime(state.timeLeft)}
      </div>

      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
        Status: <strong style={{ textTransform: 'capitalize' }}>{state.status}</strong>
        {' • '}
        Sessions Completed: <strong>{state.completedSessions}</strong>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
        {state.status === 'running' ? (
          <button
            type="button"
            className="btn"
            onClick={() => dispatch({ type: 'PAUSE' })}
            style={{ flex: 1, backgroundColor: 'var(--warning)', borderColor: 'var(--warning)' }}
          >
            Pause
          </button>
        ) : (
          <button
            type="button"
            className="btn"
            onClick={() => dispatch({ type: 'START' })}
            style={{ flex: 1 }}
          >
            {state.status === 'paused' ? 'Resume' : 'Start Focus'}
          </button>
        )}

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => dispatch({ type: 'RESET' })}
          style={{ flex: 1 }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FocusTimer;
