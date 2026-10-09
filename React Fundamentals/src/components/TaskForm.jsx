// TaskForm.jsx
// Responsibility: Collect task information and submit via onAddTask prop.
// React concepts demonstrated: component state (useState), props, event handling, form validation.

import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Math');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      subject,
      priority,
      dueDate: dueDate || null,
      completed: false,
    };
    onAddTask(newTask);
    // Clear form fields after successful submission
    setTitle('');
    setSubject('Math');
    setPriority('Low');
    setDueDate('');
    setError('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {error && <p className="error-msg">{error}</p>}
      <div className="form-group">
        <label htmlFor="title">Task Title*</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option>Math</option>
          <option>Science</option>
          <option>English</option>
          <option>Computer Science</option>
          <option>Other</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button type="submit" className="add-button">Add Task</button>
    </form>
  );
};

export default TaskForm;

