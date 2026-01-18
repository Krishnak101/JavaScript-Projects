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
        <Link to="/" className="flex flex-row items-center">
          <i className="fas fa-code "></i>{" "}
          <span className="hidden md:block">&nbsp;DevIdentity</span>
        </Link>
      </h1>
      <ul>
        <li className="copyrights">
          <small className="fa fa-copyright" aria-hidden="true" />
          <small>
            <Link
              to="https://github.com/Krishnak101"
              target="_blank"
              rel="noopener noreferrer"
            >
              Krishna
            </Link>
          </small>
        </li>

        {userStore?.token && (
          <>
            <li>
              <NavLink
                to="/dashboard"
                className="flex flex-row my-2 copyrights"
              >
                <i className="fa-sharp fa-solid fa-user"></i>
                <span className="hidden md:block">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/posts">Posts</NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/profiles">Developers</NavLink>
        </li>

        <li>
          {userStore?.token ? (
            <button
              className="flex flex-row items-center"
              onClick={() => {
                dispatch(logoutUser());
              }}
            >
              <i className="fas fa-sign-out-alt"></i>
              <span className="hidden md:block">Logout</span>
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
