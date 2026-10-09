// App.jsx
// Responsibility: Root component that owns tasks state, filter, search, and handlers.
// React concepts demonstrated: useState for state, one‑way data flow, immutability, conditional rendering.

import React, { useState } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskSummary from './components/TaskSummary';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import EmptyState from './components/EmptyState';



import './index.css';

// Sample initial tasks
const initialTasks = [
  {
    id: 1,
    title: 'Complete math homework',
    subject: 'Math',
    priority: 'High',
    dueDate: '2023-12-01',
    completed: false,
  },
  {
    id: 2,
    title: 'Read chapter 4 of biology textbook',
    subject: 'Science',
    priority: 'Medium',
    dueDate: null,
    completed: true,
  },
];

const App = () => {
  // State for tasks, filter status, and search query
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('All'); // All | Pending | Completed
  const [search, setSearch] = useState('');

  // Handler to add a new task (immutable update)
  const addTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  // Handler to toggle completion status
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Handler to delete a task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Derived counts (no separate state needed)
  const total = tasks.length;
  const pending = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;

  // Apply filter and search to derive visible tasks
  const visibleTasks = tasks
    .filter((t) => {
      if (filter === 'Pending') return !t.completed;
      if (filter === 'Completed') return t.completed;
      return true; // All
    })
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="app-container">
      <Header />
      <TaskSummary total={total} pending={pending} completed={completed} />
      <TaskForm onAddTask={addTask} />
      <TaskFilters
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />
      {visibleTasks.length > 0 ? (
        <TaskList
          tasks={visibleTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      ) : (
        <EmptyState filter={filter} search={search} />
      )}
    </div>
  );
};

export default App;
