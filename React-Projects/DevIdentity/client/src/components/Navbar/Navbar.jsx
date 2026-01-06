import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>
        <a href="index.html">
          <i className="fas fa-code "></i> DevIdentity
        </a>
      </h1>
      <ul>
        <li>
          <a href="profiles.html">Developers</a>
        </li>
        <li>
          <a href="posts.html">Posts</a>
        </li>
        <li>
          <a href="dashboard.html">Dashboard</a>
        </li>
        <li>
          <a href="login.html">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
