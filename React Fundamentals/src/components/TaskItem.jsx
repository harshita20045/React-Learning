// TaskItem.jsx
// Responsibility: Render a single task row and expose actions via callbacks.
// React concepts demonstrated: props, event handling, conditional rendering, immutability (via parent handlers).

import StatusBadge from './StatusBadge';


const TaskItem = ({ task, onToggle, onDelete }) => {

  const { id, title, subject, priority, dueDate, completed } = task;

  return (
    <li className="task-item">
 <div className="task-main">
 <input
 type="checkbox"
 checked={completed}
 onChange={() => onToggle(id)}
 aria-label="Mark as completed"
 />
 <span className="task-title">{title}</span>
 </div>
 <div className="task-meta">
 <span className="task-subject">{subject}</span>
 <StatusBadge type="priority" value={priority} />
 {dueDate && <span className="task-due">Due: {dueDate}</span>}
 <StatusBadge type="status" value={completed ? 'Completed' : 'Pending'} />
 <button className="delete-btn" onClick={() => onDelete(id)} aria-label="Delete task">
 Delete
 </button>
 </div>
 </li>
 );
};

export default TaskItem;
