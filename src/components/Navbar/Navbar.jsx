import React from "react";
import "./Navbar.css";
import LogoIcon from "../../assets/icons/logo.png";

function Navbar() {
  return (
    <div className="navbar">
      <div className="container">
        <img src={LogoIcon} alt="" className="navbar-img" />
        <ul className="navbar-list">
          <li className="navbar-item">
            <a href="#" className="navbar-link">
              Hem
            </a>
          </li>
          <li className="navbar-item">
            <a href="#" className="navbar-link">
              Sökguide
            </a>
          </li>
          <li className="navbar-item">
            <a href="#" className="navbar-link">
              Priser
            </a>
          </li>
          <li className="navbar-item">
            <a href="#" className="navbar-link">
              Om oss
            </a>
          </li>
          <li className="navbar-item">
            <a href="#" className="navbar-link">
              kontakt
            </a>
          </li>
        </ul>
        <button className="navbar-btn">Logga in</button>
      </div>
    </div>
  );
}

export default Navbar;
