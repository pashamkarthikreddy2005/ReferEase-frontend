import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../Service/UserService';
import './Navbar.css';

function Navbar() {
  const isAuthenticated = UserService.isAuthenticated();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      UserService.logout();
      navigate('/login');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <ul className="links">
          {<li><Link to="/home">Home</Link></li>}
          {isAuthenticated && <li><Link to="/profile">Profile_Update</Link></li>}
          {isAuthenticated && <li><Link to="/referrals">Referrals</Link></li>}
          {isAuthenticated && <li><Link to="/report">Report</Link></li>}
        </ul>
        <div className="buttonDiv">
          {isAuthenticated && <button className='out' onClick={handleLogout}>Logout</button>}
          {!isAuthenticated && <Link to="/login"><button className='in'>Login</button></Link>}
          {!isAuthenticated && <Link to="/register"><button className='in'>Register</button></Link>}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
