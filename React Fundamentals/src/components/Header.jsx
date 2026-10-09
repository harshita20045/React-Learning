// Header.jsx
// Responsibility: Displays the application title and a short description.
// React concepts demonstrated: Functional component, JSX, no props needed.


const Header = () => {
  return (
    <header className="app-header">
      <h1 className="app-title">Student Task Manager</h1>
      <p className="app-subtitle">Organize your study tasks efficiently</p>
    </header>
  );
};

export default Header;

