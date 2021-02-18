import React from 'react';

const Header = () => (
  <header className="header-container">
    <h1 className="company-title">Masonry Gallery</h1>
    <div className="nav-icons-grid">
      <div>
        <a className="anchor" href="https://www.facebook.com">
          <i className="fab fa-facebook nav-icon"></i>
        </a>
        <a className="anchor" href="https://www.instagram.com">
          <i className="fab fa-instagram nav-icon"></i>
        </a>
        <a className="anchor" href="https://www.youtube.com">
          <i className="fab fa-youtube nav-icon"></i>
        </a>
      </div>

      <a className="nav-icon" href="https://www.commongoodspottery.ca">
        To Shop
      </a>
    </div>
  </header>
);

export default Header;
