import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Utility from "../../Utility";


function NavigationBar(props) {
  const navigate = useNavigate()
  useEffect(()=>{

  },[props.logedIn])
  function logout(){
    Utility.fetchData("http://localhost:3000/api/accounts/logout")
    .then(data => {
      if(data)
      {
        props.onLogout()
        navigate("/home")
      }
  }) 
  .catch(error => console.error(error)); 
  }
  return (
    <header className="navbar">
      <nav >
            <Link to="/home">Home</Link>
            <Link to="/search">Search</Link>
            { props.logedIn && <Link to="/profile">Profile</Link>}
            { !props.logedIn && <Link to="/login">Log in</Link>}
            { !props.logedIn && <Link to="/register">Register</Link>}
            { props.logedIn && <Link onClick={logout} to="/logout">Logout</Link>}
      </nav>
    </header>
  );
}

export default NavigationBar;
