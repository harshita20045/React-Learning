import React, { memo } from 'react';

// Stage 9: React.memo for TaskPreview
const TaskPreview = memo(({ id, title, projectName, priority, due, onComplete, onDelete }) => {
  // console.log(`Rendering TaskPreview: ${title}`); // Uncomment to test rendering!
  return (
    <div className="task-preview">
      <div className="task-info">
        <div className="task-title">{title}</div>
        <div className="task-meta">
          <span className="badge project">{projectName}</span>
          <span>Due: {due}</span>
        </div>
      </div>
      <div>
        <span className={`badge priority-${priority}`} style={{ marginRight: '1rem' }}>{priority}</span>
        <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', marginRight: '0.5rem' }} onClick={() => onComplete(id)}>Complete</button>
        <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
});

export default TaskPreview;
