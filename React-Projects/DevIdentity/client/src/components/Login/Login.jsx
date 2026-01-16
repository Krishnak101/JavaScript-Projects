import React, { useRef, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import "./Login.css";
import { checkValidData } from "../utils/validate.js";
import BACKGROUND_IMAGE from "../../assets/bg-image.jpg";
import { handleUserAuth } from "../utils/actions/auth.js";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const location = useLocation();
  const [isLogInForm, setIsLogInForm] = useState(
    location.state?.isLogInForm ?? false
  );
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.user);

  const toggleForm = () => {
    setIsLogInForm(!isLogInForm);
  };

  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const passwordConfirmation = useRef(null);

  const [errorMessage, setErrorMessage] = useState(null);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    // form validation logic here
    const message = checkValidData(
      isLogInForm,
      email.current.value,
      password.current.value,
      username.current ? username.current.value : null,
      passwordConfirmation.current ? passwordConfirmation.current.value : null
    );
    setErrorMessage(message);
    if (message) return;
    handleUserAuth(isLogInForm, username, email, password)(dispatch);
  };

  if (userStore?.token) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <div className="header_class text-white">
      <div className=" absolute">
        <img
          src={BACKGROUND_IMAGE}
          alt="Background Image"
          className="opacity-20"
        />
      </div>
      <div className="register_form_container z-5 absolute bg-black   w-1/4 top-1/5 left-1/3">
        <h1 className="font-bold text-2xl">
          <span className="fa-sharp fa-solid fa-user"></span>
          {isLogInForm ? "Login To Your Account" : "Create An Account"}{" "}
        </h1>
        <form className="register_form" onSubmit={(e) => onFormSubmit(e)}>
          {!isLogInForm && (
            <input
              ref={username}
              type="text"
              id="username"
              name="username"
              placeholder="Full Name"
              required
              className="p-2 m-2"
            />
          )}

          <input
            ref={email}
            type="email"
            id="email"
            name="email"
            placeholder="Email ID"
            required
            className="p-2 m-2"
          />

          <input
            ref={password}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            className="p-2 m-2"
          />
          {!isLogInForm && (
            <input
              ref={passwordConfirmation}
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              placeholder="Confirm Password"
              required
              className="p-2 m-2"
            />
          )}

          <p className="font-bold text-red-500 ">{errorMessage}</p>

          <button type="submit" className="submit_btn">
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
