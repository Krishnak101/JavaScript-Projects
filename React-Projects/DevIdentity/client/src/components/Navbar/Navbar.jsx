import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../utils/actions/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.user);
  return (
    <nav className="navbar">
      <h1>
        <Link to="/">
          <i className="fas fa-code "></i>{" "}
          <span className="hide-sm">DevIdentity</span>
        </Link>
      </h1>
      <ul>
        {userStore?.token && (
          <li>
            <NavLink to="/dashboard">
              <i className="fa-sharp fa-solid fa-user"></i>
              <span className="hide-sm">Dashboard</span>
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/profiles">Developers</NavLink>
        </li>
        <li>
          <NavLink to="/posts">Posts</NavLink>
        </li>

        <li>
          {userStore?.token ? (
            <button
              onClick={() => {
                dispatch(logoutUser());
              }}
            >
              <i className="fas fa-sign-out-alt"></i>
              <span className="hide-sm">Logout</span>
            </button>
          ) : (
            <NavLink to="/login" state={{ isLogInForm: true }}>
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
