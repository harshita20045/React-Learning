import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import AppHeader from './components/AppHeader';
import Dashboard from './components/Dashboard';
import { sampleProjects } from './data/initialData';
import './index.css';

function App() {
  // Stage 8: Tasks have been moved to TaskContext!
  // App no longer needs to manage task state or prop drill handlers down.
  const [projects, setProjects] = useState(sampleProjects);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <AppHeader />
        
        {/* We only pass projects now. Tasks are accessed directly via Context. */}
        <Dashboard projects={projects} />
      </div>
    </div>
  );
}

export default App;
