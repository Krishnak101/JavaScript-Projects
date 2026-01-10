import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>
        <Link to="/">
          <i className="fas fa-code "></i> DevIdentity
        </Link>
      </h1>
      <ul>
        <li>
          <NavLink to="/profiles">Developers</NavLink>
        </li>
        <li>
          <NavLink to="/posts">Posts</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/login" state={{ isLogInForm: true }}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
