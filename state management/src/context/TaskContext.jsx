import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { sampleTasks } from '../data/initialData';

export const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

// Stage 8: The Reducer Function
// A pure function that takes the current state and an action, and returns the NEW state.
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'TASK_ADDED':
      return [...state, action.payload];
    case 'TASK_COMPLETED':
      return state.map(task => 
        task.id === action.payload ? { ...task, completed: true } : task
      );
    case 'TASK_DELETED':
      return state.filter(task => task.id !== action.payload);
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  // Stage 8: useReducer replaces useState
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    const saved = localStorage.getItem('flowstate_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return sampleTasks;
  });

  // Stage 5 Persistence (still works perfectly with useReducer)
  useEffect(() => {
    localStorage.setItem('flowstate_tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
