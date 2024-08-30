import React from "react";
import '../styles/header.css';
export default function Header(){

    return (
      <nav className="navbar">
        <h1 className="company-name">HireVista</h1>
        <ul className="navbar-list">
          <li className="about"><a href="/about">About</a></li>
          <li className="profile"><a href="/profile">Profile</a></li>
        </ul>
      </nav>
    );
};