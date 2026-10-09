
const TaskSummary = ({ total, pending, completed }) => {
 return (
 <section className="task-summary">
 <div className="summary-card">
 <h3>Total Tasks</h3>
 <p>{total}</p>
 </div>
 <div className="summary-card">
 <h3>Pending</h3>
 <p>{pending}</p>
 </div>
 <div className="summary-card">
 <h3>Completed</h3>
 <p>{completed}</p>
 </div>
 </section>
 );
};

export default TaskSummary;
