import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Create the Context
export const ThemeContext = createContext();

// Custom hook to make consuming easier
export const useTheme = () => useContext(ThemeContext);

// 2. Create the Provider Component
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('flowstate_theme');
    return saved !== null ? saved === 'dark' : true; // Default to true if not set
  });

  useEffect(() => {
    localStorage.setItem('flowstate_theme', isDark ? 'dark' : 'light');
    // Apply the theme directly to the body for global styling
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
