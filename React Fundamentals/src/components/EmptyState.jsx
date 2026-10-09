
// EmptyState.jsx
// Responsibility: Show appropriate message when no tasks are visible.
// React concepts demonstrated: conditional rendering, props.

const EmptyState = ({ filter, search }) => {
 let message = 'No tasks available. Add a new task!';
 if (search) {
 message = 'No tasks match your search query.';
 } else if (filter !== 'All') {
 message = "No tasks to display.";
 }
 return (
 <div className="empty-state"> <p>{message}</p> </div>
 );
};

export default EmptyState;
