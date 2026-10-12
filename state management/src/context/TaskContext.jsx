import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { sampleTasks } from '../data/initialData';

export const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

// ============================================================================
// STAGE 8 & USE_REDUCER DEEP-DIVE: The Pure Reducer Function
// ============================================================================
// A reducer is a pure function: (state, action) => newState.
// It must NOT have side effects (no direct API calls, no random numbers, no mutations).
// Every state transition is explicit and predictable.
export const taskReducer = (state, action) => {
  switch (action.type) {
    case 'TASK_ADDED': {
      return [
        {
          id: action.payload.id || `t_${Date.now()}`,
          title: action.payload.title,
          projectId: action.payload.projectId || 'p0',
          projectName: action.payload.projectName || 'General',
          priority: action.payload.priority || 'medium',
          due: action.payload.due || 'Today',
          completed: false,
          createdAt: new Date().toISOString(),
        },
        ...state,
      ];
    }

    case 'TASK_TOGGLED': {
      // Toggle completion state (reversible!)
      return state.map(task =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    }

    case 'TASK_DELETED': {
      return state.filter(task => task.id !== action.payload);
    }

    case 'TASK_UPDATED': {
      return state.map(task =>
        task.id === action.payload.id
          ? { ...task, ...action.payload.updates }
          : task
      );
    }

    case 'TASKS_CLEAR_COMPLETED': {
      return state.filter(task => !task.completed);
    }

    case 'TASKS_RESET': {
      return sampleTasks;
    }

    default:
      return state;
  }
};

// Initializer function for lazy state initialization in useReducer
const initTasks = () => {
  const saved = localStorage.getItem('flowstate_tasks');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {
      console.error('Failed to parse saved tasks:', e);
    }
  }
  return sampleTasks;
};

export const TaskProvider = ({ children }) => {
  // useReducer takes (reducer, initialArg, initFunction)
  const [tasks, dispatch] = useReducer(taskReducer, null, initTasks);

  // Sync tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('flowstate_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Convenient helper dispatchers alongside raw dispatch
  const addTask = (taskData) => dispatch({ type: 'TASK_ADDED', payload: taskData });
  const toggleTask = (taskId) => dispatch({ type: 'TASK_TOGGLED', payload: taskId });
  const deleteTask = (taskId) => dispatch({ type: 'TASK_DELETED', payload: taskId });
  const clearCompleted = () => dispatch({ type: 'TASKS_CLEAR_COMPLETED' });
  const resetTasks = () => dispatch({ type: 'TASKS_RESET' });

  return (
    <TaskContext.Provider
      value={{
        tasks,
        dispatch,
        addTask,
        toggleTask,
        deleteTask,
        clearCompleted,
        resetTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
