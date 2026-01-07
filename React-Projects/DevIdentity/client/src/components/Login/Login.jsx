import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Login.css";
import { checkValidData } from "./validate";
import BACKGROUND_IMAGE from "../../assets/bg-image.jpg";
const Login = () => {
  const location = useLocation();
  const [isLogInForm, setIsLogInForm] = useState(
    location.state?.isLogInForm ?? false
  );

  const toggleForm = () => {
    setIsLogInForm(!isLogInForm);
  };

  return (
    <div className="header_class text-white">
      <div className=" absolute">
        <img
          src={BACKGROUND_IMAGE}
          alt="Background Image"
          className="opacity-20"
        />
      </div>
      <div className="login_form z-5 absolute bg-black   w-1/4 top-1/5 left-1/3">
        <h1 className="font-bold text-3xl">
          {isLogInForm ? "Log In" : "Sign Up"}{" "}
        </h1>
        <form className="register_form">
          {!isLogInForm && (
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Full Name"
              required
              className="p-2 m-2"
            />
          )}

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email ID"
            required
            className="p-2 m-2"
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            className="p-2 m-2"
          />
          {!isLogInForm && (
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              placeholder="Confirm Password"
              required
              className="p-2 m-2"
            />
          )}

          <button type="submit" className="submit_btn bg-blue-700 font-bold">
            {isLogInForm ? "Log In" : "Sign Up"}
          </button>
        </form>
        <p className="login_new">
          {isLogInForm ? "New to DevIdentity?" : "Already have an account?"}{" "}
          <a href="#" className="login_signup font-bold" onClick={toggleForm}>
            {isLogInForm ? "Sign up now" : "Log in now"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
