import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { clearUserState } from "../utils/reduxStore/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.user);
  return (
    <nav className="navbar">
      <h1>
        <Link to="/">
          <i className="fas fa-code "></i> DevIdentity
        </Link>
      </h1>
      <ul>
        {userStore?.token && (
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
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
                dispatch(clearUserState());
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
