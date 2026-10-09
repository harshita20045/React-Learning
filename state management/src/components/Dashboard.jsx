import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import StatCard from './StatCard';
import ProjectCard from './ProjectCard';
import TaskPreview from './TaskPreview';
import { dashboardStats } from '../data/initialData';
import { useTasks } from '../context/TaskContext';

// Dashboard only receives projects. Tasks are managed via Context and useReducer.
const Dashboard = ({ projects }) => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  
  // Stage 8: Consume state and dispatch from Context
  const { tasks, dispatch } = useTasks();
  
  // We keep NEW task input state local, because ONLY the Dashboard needs to know what the user is currently typing.
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Stage 6: DOM Reference
  const taskInputRef = useRef(null);

  // Stage 6: Mutable Value Reference for the Interval ID
  const intervalRef = useRef(null);
  
  // Stage 5 & 6: Focus Timer State
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);

  // Stage 6: Timer Handlers using useRef
  const startTimer = () => {
    if (timerActive) return;
    
    setTimerActive(true);
    // Store the interval ID in a ref. This mutable value is preserved across renders,
    // but updating it does NOT trigger a re-render.
    intervalRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          setTimerActive(false);
          alert("Focus session complete!");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setTimerActive(false);
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    pauseTimer();
    setTimeLeft(25 * 60);
  };

  const toggleTimer = () => {
    if (timerActive) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  // Cleanup on unmount to prevent memory leaks
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Rendering Experiment
  let normalVariable = 0;
  const [stateVariable, setStateVariable] = useState(0);

  const incrementNormalVariable = () => {
    normalVariable += 1;
    console.log('Normal variable is now:', normalVariable);
  };

  const incrementStateVariable = () => {
    setStateVariable(stateVariable + 1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    // Stage 8: Dispatch the TASK_ADDED action
    dispatch({ 
      type: 'TASK_ADDED', 
      payload: {
        id: `t${Date.now()}`,
        title: newTaskTitle,
        projectId: 'p0',
        projectName: 'Inbox',
        priority: 'low',
        due: 'Today',
        completed: false
      }
    });

    setNewTaskTitle('');
    
    // Stage 6: DOM Focus
    // We directly interact with the DOM element to keep it focused after submitting,
    // allowing the user to rapidly type multiple tasks.
    if (taskInputRef.current) {
      taskInputRef.current.focus();
    }
  };

  // Stage 9: useMemo
  // We wrap this calculation in useMemo so it only recalculates when `tasks` changes, 
  // not when other state (like typing in newTaskTitle) changes.
  const actualCompletedTasks = useMemo(() => {
    return tasks.filter(task => task.completed).length;
  }, [tasks]);

  // Stage 9: useCallback
  // We wrap these functions in useCallback so they maintain the exact same memory address across renders.
  // If we didn't do this, React.memo on TaskPreview would be broken because the props would appear "new" every time.
  const handleTaskComplete = useCallback((taskId) => {
    dispatch({ type: 'TASK_COMPLETED', payload: taskId });
  }, [dispatch]);

  const handleTaskDelete = useCallback((taskId) => {
    dispatch({ type: 'TASK_DELETED', payload: taskId });
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h1>Welcome back, Developer!</h1>
        <p>{today}</p>
      </div>

      <div className="stats-grid">
        <StatCard title="Completed Tasks" value={actualCompletedTasks} />
        <StatCard title="Focus Minutes" value={dashboardStats.focusMinutes} unit="m" />
        <StatCard title="Completion Rate" value={dashboardStats.completionRate} unit="%" />
      </div>

      <div className="content-grid">
        <div>
          <h2 className="section-header">Upcoming Tasks</h2>
          
          <form onSubmit={handleFormSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input 
              ref={taskInputRef}
              type="text" 
              placeholder="Add a new task..." 
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}
            />
            <button type="submit" className="btn">Add</button>
          </form>

          <div className="tasks-list">
            {tasks.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No tasks left. Great job!</p>
            ) : (
              tasks.filter(task => !task.completed).map(task => (
                <TaskPreview 
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  projectName={task.projectName}
                  priority={task.priority}
                  due={task.due}
                  onComplete={handleTaskComplete}
                  onDelete={handleTaskDelete}
                />
              ))
            )}
          </div>
          
          {/* Rendering Experiment Section */}
          <div className="experiment-card">
            <h2>React Rendering Experiment</h2>
            <p>React updates the UI when state changes, not when regular variables change.</p>
            
            <div style={{ marginTop: '1rem' }}>
              <p><strong>Normal Variable:</strong> {normalVariable}</p>
              <p><strong>State Variable:</strong> {stateVariable}</p>
            </div>
            
            <div className="experiment-controls">
              <button className="btn btn-secondary" onClick={incrementNormalVariable}>
                Update Normal Variable
              </button>
              <button className="btn" onClick={incrementStateVariable}>
                Update State Variable
              </button>
            </div>
            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Check the console when clicking "Update Normal Variable". The value changes, but the screen doesn't update until a state change triggers a re-render.
            </p>
          </div>
        </div>

        <div>
          <h2 className="section-header">Active Projects</h2>
          <div className="projects-list">
            {projects.map(project => (
              <ProjectCard 
                key={project.id}
                title={project.title}
                completedTasks={project.completedTasks}
                totalTasks={project.totalTasks}
              />
            ))}
          </div>
          
          <div style={{ marginTop: '2rem' }}>
             <h2 className="section-header">Focus Session</h2>
             <div className="stat-card" style={{ textAlign: 'center', padding: '2rem' }}>
               <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Ready to focus?</h3>
               <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Start a timer to track your deep work.</p>
               
               <div style={{ fontSize: '3rem', fontWeight: 700, margin: '1rem 0', fontFamily: 'monospace' }}>
                 {formatTime(timeLeft)}
               </div>

               <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                 <button className="btn" onClick={toggleTimer} style={{ flex: 1, backgroundColor: timerActive ? 'var(--warning)' : 'var(--accent-primary)' }}>
                   {timerActive ? 'Pause' : 'Start'}
                 </button>
                 <button className="btn btn-secondary" onClick={resetTimer} style={{ flex: 1 }}>
                   Reset
                 </button>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
