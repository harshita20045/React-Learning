import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StatCard from './StatCard';
import ProjectCard from './ProjectCard';
import TaskPreview from './TaskPreview';
import FocusTimer from './FocusTimer';
import StateArchitectureGuide from './StateArchitectureGuide';

import {
  selectAllProjects,
  addProject,
  deleteProject,
  syncProjectStats,
} from '../store/slices/projectsSlice';

import {
  selectFilters,
  setSelectedProjectId,
  setPriorityFilter,
  setSearchQuery,
  resetFilters,
} from '../store/slices/filtersSlice';

import { useTasks } from '../context/TaskContext';

const Dashboard = () => {
  const dispatch = useDispatch();

  // 1. Redux State: Projects & Global Filter selectors
  const projects = useSelector(selectAllProjects);
  const filters = useSelector(selectFilters);
  const { selectedProjectId, priorityFilter, searchQuery } = filters;

  // 2. useReducer State via TaskContext
  const { tasks, addTask, toggleTask, deleteTask, clearCompleted } = useTasks();

  // 3. Local UI state (useState) for form inputs
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedTaskProject, setSelectedTaskProject] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');

  // Effective project to assign: user selection if valid, or first project
  const effectiveTaskProject = projects.some(p => p.id === selectedTaskProject)
    ? selectedTaskProject
    : (projects[0]?.id || 'p1');

  // 4. useRef: For direct DOM focus manipulation
  const taskInputRef = useRef(null);
  const projectInputRef = useRef(null);

  // Sync Redux project statistics whenever tasks (from useReducer) change
  useEffect(() => {
    dispatch(syncProjectStats(tasks));
  }, [tasks, dispatch]);

  // Focus project input when opening project modal/form
  useEffect(() => {
    if (showAddProject && projectInputRef.current) {
      projectInputRef.current.focus();
    }
  }, [showAddProject]);

  // Filter tasks based on Redux filter state & search query
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Filter by Project
      if (selectedProjectId !== 'all' && task.projectId !== selectedProjectId) {
        // Also support fallback matching by title
        const selectedProj = projects.find(p => p.id === selectedProjectId);
        if (!selectedProj || task.projectName !== selectedProj.title) {
          return false;
        }
      }

      // Filter by Priority
      if (priorityFilter !== 'all' && task.priority !== priorityFilter) {
        return false;
      }

      // Filter by Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesProject = task.projectName?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesProject) return false;
      }

      return true;
    });
  }, [tasks, selectedProjectId, priorityFilter, searchQuery, projects]);

  // Live computed stats using useMemo
  const totalCompletedTasks = useMemo(() => {
    return tasks.filter(t => t.completed).length;
  }, [tasks]);

  const completionRate = useMemo(() => {
    if (tasks.length === 0) return 0;
    return Math.round((totalCompletedTasks / tasks.length) * 100);
  }, [tasks, totalCompletedTasks]);

  // Handlers for Redux Project actions
  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProjectTitle.trim()) return;

    dispatch(addProject({ title: newProjectTitle.trim() }));
    setNewProjectTitle('');
    setShowAddProject(false);
  };

  const handleDeleteProject = useCallback((projectId) => {
    if (window.confirm('Delete this project?')) {
      dispatch(deleteProject(projectId));
      if (selectedProjectId === projectId) {
        dispatch(setSelectedProjectId('all'));
      }
    }
  }, [dispatch, selectedProjectId]);

  const handleSelectProjectFilter = useCallback((projectId) => {
    // If clicking same project, toggle back to 'all'
    if (selectedProjectId === projectId) {
      dispatch(setSelectedProjectId('all'));
    } else {
      dispatch(setSelectedProjectId(projectId));
    }
  }, [dispatch, selectedProjectId]);

  // Handler for useReducer Task actions
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const assignedProject = projects.find(p => p.id === effectiveTaskProject);

    addTask({
      title: newTaskTitle.trim(),
      projectId: effectiveTaskProject,
      projectName: assignedProject ? assignedProject.title : 'Inbox',
      priority: newTaskPriority,
      due: 'Today',
    });

    setNewTaskTitle('');

    // useRef: return focus to input
    if (taskInputRef.current) {
      taskInputRef.current.focus();
    }
  };

  const handleToggleTask = useCallback((taskId) => {
    toggleTask(taskId);
  }, [toggleTask]);

  const handleDeleteTask = useCallback((taskId) => {
    deleteTask(taskId);
  }, [deleteTask]);

  return (
    <div className="dashboard">
      {/* State Architecture Guide Banner */}
      <StateArchitectureGuide />

      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>FlowState Dashboard</h1>
        <p>A unified productivity hub demonstrating Redux Toolkit and useReducer in tandem.</p>
      </div>

      {/* Dynamic Statistics Bar */}
      <div className="stats-grid">
        <StatCard title="Completed Tasks" value={totalCompletedTasks} />
        <StatCard title="Active Tasks" value={tasks.filter(t => !t.completed).length} />
        <StatCard title="Total Projects (Redux)" value={projects.length} />
        <StatCard title="Completion Rate" value={completionRate} unit="%" />
      </div>

      {/* Global Filter Bar (Controlled via Redux filtersSlice) */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '240px' }}>
          <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>🔍</span>
          <input
            type="text"
            placeholder="Search tasks or projects (Redux filter)..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            style={{
              flex: 1,
              padding: '0.45rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              backgroundColor: 'var(--bg-main)',
              color: 'var(--text-main)',
            }}
          />
        </div>

        {/* Priority Filter Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Priority:</span>
          {['all', 'high', 'medium', 'low'].map(p => (
            <button
              key={p}
              type="button"
              onClick={() => dispatch(setPriorityFilter(p))}
              className={`btn ${priorityFilter === p ? '' : 'btn-secondary'}`}
              style={{
                padding: '0.25rem 0.6rem',
                fontSize: '0.75rem',
                textTransform: 'capitalize',
              }}
            >
              {p}
            </button>
          ))}

          {(selectedProjectId !== 'all' || priorityFilter !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => dispatch(resetFilters())}
              className="btn btn-secondary"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', color: 'var(--danger)' }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="content-grid">
        {/* Left Column: Tasks Section (useReducer) */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h2 className="section-header" style={{ marginBottom: '0.2rem' }}>Tasks</h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Powered by <strong>useReducer</strong> in <code>TaskContext</code>
              </span>
            </div>
            {totalCompletedTasks > 0 && (
              <button
                type="button"
                onClick={clearCompleted}
                className="btn btn-secondary"
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
              >
                Clear Completed ({totalCompletedTasks})
              </button>
            )}
          </div>

          {/* Add Task Form */}
          <form
            onSubmit={handleTaskSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              marginBottom: '1.25rem',
              backgroundColor: 'var(--bg-card)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
            }}
          >
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                ref={taskInputRef}
                type="text"
                placeholder="What do you need to accomplish?"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  backgroundColor: 'var(--bg-main)',
                  color: 'var(--text-main)',
                }}
              />
              <button type="submit" className="btn">Add Task</button>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Assign Project (Redux):</span>
                <select
                  value={effectiveTaskProject}
                  onChange={(e) => setSelectedTaskProject(e.target.value)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: 'var(--bg-main)',
                    color: 'var(--text-main)',
                  }}
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Priority:</span>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: 'var(--bg-main)',
                    color: 'var(--text-main)',
                  }}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </form>

          {/* Active Project Filter Chip Indicator */}
          {selectedProjectId !== 'all' && (
            <div
              style={{
                marginBottom: '0.75rem',
                padding: '0.4rem 0.75rem',
                backgroundColor: 'var(--bg-accent-light)',
                color: 'var(--accent-primary)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>Filtering tasks for: <strong>{projects.find(p => p.id === selectedProjectId)?.title}</strong></span>
              <button
                type="button"
                onClick={() => dispatch(setSelectedProjectId('all'))}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-primary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Clear Project Filter ✕
              </button>
            </div>
          )}

          {/* Task List */}
          <div className="tasks-list">
            {filteredTasks.length === 0 ? (
              <div
                style={{
                  padding: '2rem',
                  textAlign: 'center',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px dashed var(--border-light)',
                  color: 'var(--text-muted)',
                }}
              >
                No tasks match your current criteria. Create a new task or reset your filters!
              </div>
            ) : (
              filteredTasks.map(task => (
                <TaskPreview
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  projectName={task.projectName}
                  priority={task.priority}
                  due={task.due}
                  completed={task.completed}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              ))
            )}
          </div>
        </div>

        {/* Right Column: Projects (Redux) & Focus Session (useReducer) */}
        <div>
          {/* Active Projects (Redux) */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div>
                <h2 className="section-header" style={{ marginBottom: '0.2rem' }}>Projects</h2>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Global state managed by <strong>Redux Toolkit</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowAddProject(!showAddProject)}
                className="btn btn-secondary"
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
              >
                {showAddProject ? 'Cancel' : '+ New Project'}
              </button>
            </div>

            {/* Inline Add Project Form */}
            {showAddProject && (
              <form
                onSubmit={handleAddProject}
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--accent-primary)',
                }}
              >
                <input
                  ref={projectInputRef}
                  type="text"
                  placeholder="New project title..."
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.4rem 0.6rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: 'var(--bg-main)',
                    color: 'var(--text-main)',
                  }}
                />
                <button type="submit" className="btn" style={{ padding: '0.4rem 0.8rem' }}>Create</button>
              </form>
            )}

            {/* Project List */}
            <div className="projects-list">
              {projects.map(project => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  completedTasks={project.completedTasks || 0}
                  totalTasks={project.totalTasks || 0}
                  isSelected={selectedProjectId === project.id}
                  onSelect={handleSelectProjectFilter}
                  onDelete={projects.length > 1 ? handleDeleteProject : null}
                />
              ))}
            </div>
          </div>

          {/* Focus Timer Component (useReducer finite state machine) */}
          <FocusTimer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
