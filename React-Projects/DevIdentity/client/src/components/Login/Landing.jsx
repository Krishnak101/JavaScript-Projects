import React from "react";
import BG_IMAGE from "../../assets/bg-image.jpg";
import "./Landing.css";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark_overlay">
        <div className="landing_bg">
          <img src={BG_IMAGE} alt="Background Image" />
        </div>
        <div className="landing_inner">
          <h1 className="text-3xl">Developer Identity</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="landing_buttons">
            <a
              href="register.html"
              id="btn_signup"
              className=" btn btn-primary btn-lg"
            >
              Sign Up
            </a>
            <a href="login.html" className="btn btn-light btn-lg">
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
