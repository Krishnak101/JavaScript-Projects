import React from "react";
import "./Navbar.css";
import Fire from "../../assets/fire.png";
import Star from "../../assets/glowing-star.png";
import Party from "../../assets/partying-face.png";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { toggleGptState } from "../utils/redux/gptSlice";
import { useDispatch, useSelector } from "react-redux";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { setLanguage } from "../utils/redux/configSlice";
// import DarkMode from "../DarkMode/DarkMode";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isGptOpen = useSelector((state) => state.gpt.isGptOpen);

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

  const handleGptSearch = () => {
    dispatch(toggleGptState());

    !isGptOpen ? navigate("/home/gpt_search") : navigate("/home/popular");
  };

  // Implementing language change logic here
  const handleLanguageSelection = (event) => {
    const selectedLanguage = event.target.value;
    dispatch(setLanguage(selectedLanguage)); // Dispatch action to update language in Redux store
  };

  return (
    <nav className="navbar">
      <div>
        <Logo />
      </div>

      <div className="navbar_links ">
        {!isGptOpen && (
          <>
            <NavLink className="navbar_link" to="/home/popular">
              Popular{" "}
              <img src={Fire} alt="fire emoji" className="navbar_emoji" />
            </NavLink>
            <NavLink className="navbar_link" to="/home/top_rated">
              Top Rated{" "}
              <img src={Star} alt="star emoji" className="navbar_emoji" />
            </NavLink>
            <NavLink className="navbar_link" to="/home/upcoming">
              Upcoming{" "}
              <img src={Party} alt="party emoji" className="navbar_emoji" />
            </NavLink>
          </>
        )}

        {isGptOpen && (
          <select
            className="language_selector"
            onChange={handleLanguageSelection}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        )}

        <button
          className="gpt_container bg-green-600 hover:bg-green-700 transition"
          onClick={handleGptSearch}
        >
          {isGptOpen ? "Home Page" : "GPT Search"}
        </button>
        <button
          onClick={handleSignOut}
          className="signout_btn bg-red-600 text-white font-bold hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
