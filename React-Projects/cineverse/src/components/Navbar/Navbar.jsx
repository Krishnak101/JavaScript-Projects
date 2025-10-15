import React from "react";
import "./Navbar.css";
import Fire from "../../assets/fire.png";
import Star from "../../assets/glowing-star.png";
import Party from "../../assets/partying-face.png";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
// import DarkMode from "../DarkMode/DarkMode";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <Logo />
      </div>

      <div className="navbar_links">
        {/* <DarkMode /> */}
        <NavLink to="/home/popular">
          Popular <img src={Fire} alt="fire emoji" className="navbar_emoji" />
        </NavLink>
        <NavLink to="/home/top_rated">
          Top Rated <img src={Star} alt="star emoji" className="navbar_emoji" />
        </NavLink>
        <NavLink to="/home/upcoming">
          Upcoming{" "}
          <img src={Party} alt="party emoji" className="navbar_emoji" />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
