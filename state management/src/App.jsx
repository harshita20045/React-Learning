import React from 'react';
import Sidebar from './components/Sidebar';
import AppHeader from './components/AppHeader';
import Dashboard from './components/Dashboard';

function App() {
  // Redux Toolkit now manages projects globally (in store/slices/projectsSlice)
  // useReducer in TaskContext manages tasks globally
  // useReducer in FocusTimer manages the Pomodoro state machine locally
  // App serves as the clean top-level layout container.
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <AppHeader />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
