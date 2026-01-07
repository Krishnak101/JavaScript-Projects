import React from "react";
import BG_IMAGE from "../../assets/bg-image.jpg";
import "./Landing.css";
import { Link } from "react-router-dom";

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
            <Link
              to="/login"
              id="btn_signup"
              state={{ isLogInForm: false }}
              className=" btn btn-primary btn-lg"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              state={{ isLogInForm: true }}
              className="btn btn-light btn-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
