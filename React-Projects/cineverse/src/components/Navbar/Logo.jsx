import React from "react";
import Cineverse from "../../assets/CineVerse_logo.png";
import "../Login/login.css";

const Logo = () => {
  return (
    <div className="logo_class top-0 absolute z-6  bg-gradient-to-b from-black">
      <img className="w-44" src={Cineverse} alt="Cineverse Logo" />
    </div>
  );
};

export default Logo;
