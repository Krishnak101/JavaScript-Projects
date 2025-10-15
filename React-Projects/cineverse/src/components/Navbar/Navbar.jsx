import React from "react";
import "./Navbar.css";
import Fire from "../../assets/fire.png";
import Star from "../../assets/glowing-star.png";
import Party from "../../assets/partying-face.png";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
// import DarkMode from "../DarkMode/DarkMode";

const Navbar = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  return (
    <nav className="navbar">
      <div>
        <Logo />
      </div>

      <div className="navbar_links ">
        {/* <DarkMode /> */}
        <NavLink className="navbar_link" to="/home/popular">
          Popular <img src={Fire} alt="fire emoji" className="navbar_emoji" />
        </NavLink>
        <NavLink className="navbar_link" to="/home/top_rated">
          Top Rated <img src={Star} alt="star emoji" className="navbar_emoji" />
        </NavLink>
        <NavLink className="navbar_link" to="/home/upcoming">
          Upcoming{" "}
          <img src={Party} alt="party emoji" className="navbar_emoji" />
        </NavLink>
        <button
          onClick={handleSignOut}
          className="signout_btn bg-red-600 text-white font-bold rounded hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
