import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Nav({ activePage }) {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        <li><Link to="/"           className={activePage === 'home'       ? 'active' : ''}>Home</Link></li>
        <li><Link to="/search"     className={activePage === 'search'     ? 'active' : ''}>Universities</Link></li>
        <li><Link to="/review"     className={activePage === 'review'     ? 'active' : ''}>Reviews</Link></li>
        <li><Link to="/calculator" className={activePage === 'calculator' ? 'active' : ''}>Calculator</Link></li>
        <li className="profile-menu" onMouseEnter={() => setDropdownOpen(true)}
                                     onMouseLeave={() => setDropdownOpen(false)}>
          <img src="/profile.png" alt="Profile" className="profile-icon" />
          {dropdownOpen && (
            <div className="dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}