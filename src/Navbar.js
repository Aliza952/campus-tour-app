import React from 'react';
import './Navbar.css';

export default function Navbar({ username, onLogout, onNavigate }) {
  const handleLogoutClick = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      onLogout();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => onNavigate('home')}>
        🏫 SAKEC Metaverse
      </div>
      <ul className="navbar-links">
        <li><button onClick={() => onNavigate('home')}>Home</button></li>
        <li><button onClick={() => onNavigate('chat')}>Chat</button></li>
        <li><button onClick={() => onNavigate('about')}>About</button></li>
        <li><button onClick={() => onNavigate('settings')}>Settings</button></li>
        <li><button onClick={handleLogoutClick}>Logout</button></li>
      </ul>
      <div className="navbar-user" title={username}>👤 {username}</div>
    </nav>
  );
}
