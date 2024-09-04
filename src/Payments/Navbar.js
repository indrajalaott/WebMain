// Navbar.js
import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-brand">Indrajala</a>
        <div className="navbar-links">
          <a href="/login" className="navbar-button">Login</a>
          <a href="/register" className="navbar-button">Register</a>
        </div>
        <button className="hamburger-menu-button" onClick={toggleMenu}>
          ☰
        </button>
        <div className={`navbar-links-mobile ${isMenuOpen ? 'active' : ''}`}>
          <a href="/login" className="navbar-link">Login</a>
          <a href="/register" className="navbar-link">Register</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
