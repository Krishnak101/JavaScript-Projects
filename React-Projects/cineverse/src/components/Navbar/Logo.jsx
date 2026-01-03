import React from "react";
import Cineverse from "../../assets/CineVerse_logo.png";
import "../Login/login.css";

const Logo = () => {
  return (
    <div className="logo_class top-0 absolute left-0 z-6 opacity transparent">
      <img className="w-44" src={Cineverse} alt="Cineverse Logo" />
    </div>
  );
};

export default Logo;
