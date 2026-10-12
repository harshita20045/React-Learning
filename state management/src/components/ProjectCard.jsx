import React, { memo } from 'react';

// Stage 9: React.memo
// By wrapping the component in memo, React will ONLY re-render this card if its props change.
const ProjectCard = memo(({ id, title, completedTasks, totalTasks, isSelected, onSelect, onDelete }) => {
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div
      className={`project-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect && onSelect(id)}
      style={{
        cursor: onSelect ? 'pointer' : 'default',
        border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-light)',
        transition: 'all 0.2s ease',
        position: 'relative',
      }}
    >
      <div className="project-header" style={{ marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1rem' }}>📁</span>
          <span className="project-title" style={{ fontSize: '1rem', fontWeight: 600 }}>{title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="project-progress-text" style={{ fontSize: '0.8rem', fontWeight: 500 }}>
            {completedTasks}/{totalTasks} ({progress}%)
          </span>
          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
              aria-label="Delete project"
              title="Delete project"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.9rem',
                padding: '0.1rem 0.3rem',
                borderRadius: '4px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--danger)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="progress-bar-bg" style={{ height: '8px' }}>
        <div
          className="progress-bar-fill"
          style={{
            width: `${progress}%`,
            backgroundColor: progress === 100 ? 'var(--success)' : 'var(--accent-primary)',
            transition: 'width 0.4s ease',
          }}
        />
      </div>
    </div>
  );
});

export default ProjectCard;
