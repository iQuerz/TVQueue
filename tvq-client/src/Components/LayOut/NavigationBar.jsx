import { Link } from "react-router-dom";


function NavigationBar() {
  return (
    <header className="navbar">
      <nav >
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/login">Log in</Link>
            <Link to="/register">Register</Link>
            <Link to="/logout">Logout</Link>
      </nav>
    </header>
  );
}

export default NavigationBar;
