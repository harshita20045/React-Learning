// TaskFilters.jsx
// Responsibility: Provides UI controls to filter tasks by status and search by title.
// React concepts demonstrated: props for data flow, controlled inputs, event handling.



const TaskFilters = ({ filter, setFilter, search, setSearch }) => {
  return (
    <section className="task-filters">
      <div className="filter-buttons">
        {['All', 'Pending', 'Completed'].map((status) => (
          <button
            key={status}
            type="button"
            className={filter === status ? "active" : ""}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        className="search-input"
        onChange={(e) => setSearch(e.target.value)}
      />
    </section>
  );
};

export default TaskFilters;
