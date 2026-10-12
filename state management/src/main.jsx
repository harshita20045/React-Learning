import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Redux Toolkit Provider for global state (Projects, UI Filters) */}
    <Provider store={store}>
      {/* Context API for Theme */}
      <ThemeProvider>
        {/* Context API + useReducer for Tasks domain */}
        <TaskProvider>
          <App />
        </TaskProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
