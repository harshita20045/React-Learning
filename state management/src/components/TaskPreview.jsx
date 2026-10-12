import React, { memo } from 'react';

// Stage 9: React.memo for TaskPreview
const TaskPreview = memo(({ id, title, projectName, priority, due, completed, onToggle, onDelete }) => {
  return (
    <div
      className="task-preview"
      style={{
        opacity: completed ? 0.6 : 1,
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <input
          type="checkbox"
          checked={!!completed}
          onChange={() => onToggle(id)}
          aria-label={`Mark task ${title} as ${completed ? 'incomplete' : 'complete'}`}
          style={{
            cursor: 'pointer',
            width: '18px',
            height: '18px',
            accentColor: 'var(--accent-primary)',
          }}
        />
        <div className="task-info">
          <div
            className="task-title"
            style={{
              textDecoration: completed ? 'line-through' : 'none',
              color: completed ? 'var(--text-muted)' : 'var(--text-main)',
            }}
          >
            {title}
          </div>
          <div className="task-meta">
            <span className="badge project">{projectName}</span>
            <span>Due: {due}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span className={`badge priority-${priority}`}>{priority}</span>
        <button
          type="button"
          className="btn btn-secondary"
          style={{
            padding: '0.25rem 0.6rem',
            fontSize: '0.75rem',
            color: 'var(--danger)',
            borderColor: 'var(--border-light)',
          }}
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
});

export default TaskPreview;
