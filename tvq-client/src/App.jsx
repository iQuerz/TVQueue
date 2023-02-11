import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './Components/LayOut/NavigationBar';
import AdminPage from './Pages/AdminPage';
import HomePage from './Pages/Home';

import LoginPage from "./Pages/LoginPage";
import MediaPage from './Pages/MediaPage';
import ProfilePage from './Pages/ProfilePage';
import RegisterPage from './Pages/RegisterPage';
import SearchPage from './Pages/SearchPage';

function App() {

    return (
        <> 
            <Router>
                <NavigationBar/>
                <Routes>     
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/Profile" element={<ProfilePage/>} />
                    <Route path="/Login" element={<LoginPage/>} />
                    <Route path="/Register" element={<RegisterPage />} />
                    <Route path="/Media" element={<MediaPage />} />
                    <Route path="/Search" element={<SearchPage />} />
                    <Route path="/Admin" element={<AdminPage />} />
                </Routes>
            </Router>
        </>
    )
}

export default App