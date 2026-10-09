
// StatusBadge.jsx
// Responsibility: Render a small badge for priority or status.
// React concepts demonstrated: props, conditional rendering, CSS styling.

const StatusBadge = ({ type, value }) => {
 const className = "status-badge";
 return <span className={className}>{value}</span>;
};

export default StatusBadge;
