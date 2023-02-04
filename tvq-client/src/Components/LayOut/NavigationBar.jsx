import { Link } from "react-router-dom";


function NavigationBar() {
  return (
    <header >
      <nav >
            <Link to="/">Home</Link>
            <Link to="/feed">Feed</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/login">Log in</Link>
            <Link to="/register">Register</Link>
            <Link to="/logout">Logout</Link>
      </nav>
    </header>
  );
}

export default NavigationBar;
