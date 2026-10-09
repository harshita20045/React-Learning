import React, { memo } from 'react';

// Stage 9: React.memo
// By wrapping the component in memo, React will ONLY re-render this card if its props change.
const ProjectCard = memo(({ title, completedTasks, totalTasks }) => {
  // console.log(`Rendering ProjectCard: ${title}`); // Uncomment to test rendering!
  
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  return (
    <div className="project-card">
      <div className="project-header">
        <div className="project-title">{title}</div>
        <div className="project-progress-text">{completedTasks}/{totalTasks}</div>
      </div>
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
});

export default ProjectCard;
