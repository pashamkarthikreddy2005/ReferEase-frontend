import React from 'react';
import { 
  BrowserRouter as Router,
  Route, 
  Routes 
} from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import LoginPage from './Auth/Login';
import Register from './Auth/Register';
import Profile from './Components/Profile';
import Referrals from './Components/Referrals';
import Report from './Components/Report';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/report" element={<Report/>} />
      </Routes>
    </Router>
  );
}

export default App;
