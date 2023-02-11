import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './Components/LayOut/NavigationBar';
import HomePage from './Pages/Home';
import Utility from './Utility';

import LoginPage from "./Pages/LoginPage";
import MediaPage from './Pages/MediaPage';
import ProfilePage from './Pages/ProfilePage';
import RegisterPage from './Pages/RegisterPage';
import SearchPage from './Pages/SearchPage';

function App() {
    const [logedIn, setLogedIn] = useState(false);
    useEffect(()=>{
        checkIfLogedIn();
    },[])
    function checkIfLogedIn(){
        Utility.fetchData("http://localhost:3000/api/accounts/me")
        .then(data => {
          if (data){
            setLogedIn(true);
          }
      }) 
      .catch(error => console.error(error)); 
      }
      function handleLogIn(){
        setLogedIn(true)
      }
      function handleLogOut(){
        setLogedIn(false)
      }
    return (
        <> 
            <Router>
                <NavigationBar logedIn={logedIn} onLogout={handleLogOut}/>
                    <Routes>     
                        <Route path="/Home" element={<HomePage/>} />
                        <Route path="/Profile" element={<ProfilePage/>} />
                        <Route path="/Login" element={<LoginPage onLogin={handleLogIn}/>} />
                        <Route path="/Register" element={<RegisterPage />} />
                        <Route path="/Media" element={<MediaPage />} />
                        <Route path="/Search" element={<SearchPage />} />
                    </Routes>
            </Router>
        </>
    )
}

export default App