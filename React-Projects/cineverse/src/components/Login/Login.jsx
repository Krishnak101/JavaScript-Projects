import React, { useRef, useState } from "react";
import "./login.css";
import { checkValidData } from "./validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import Logo from "../Navbar/Logo";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserState } from "../utils/userSlice";
import { BACKGROUND_IMAGE_URL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const fullname = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const validateForm = () => {
    // form validation logic here
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (isSignInForm) {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    } else {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullname.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(setUserState({ uid, email, displayName }));
            })
            .catch((error) => {
              console.error(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };

  return (
    <div className="header_class ">
      <Logo />
      <div className="absolute">
        <img
          src={BACKGROUND_IMAGE_URL}
          alt="Background Image"
          className="w-full"
        />
      </div>
      <div className="login_container z-5 absolute bg-black   w-1/4 top-1/5 left-1/3">
        <form onSubmit={(e) => e.preventDefault()} className="login_form ">
          <h1 className="text-4xl font-bold ">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              type="text"
              ref={fullname}
              placeholder="Full Name"
              className="username_input  bg-gray-600"
            />
          )}
          <input
            type="email"
            ref={email}
            placeholder="Email or phone number"
            className="email_input bg-gray-600"
          />
          <br />
          <input
            type="password"
            ref={password}
            placeholder="Password"
            className="password_input bg-gray-600"
          />
          <br />
          <p className="font-bold text-red-500 ">{errorMessage}</p>
          <button
            className="login_button font-bold"
            onClick={() => {
              validateForm();
            }}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="login_new">
            {isSignInForm ? "New to Cineverse?" : "Already have an account?"}{" "}
            <a href="#" className="login_signup font-bold" onClick={toggleForm}>
              {!isSignInForm ? "Sign in now" : "Sign up now"}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
 