import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./App.css";

import Login from "./components/Login/login";
import appStore from "./components/utils/redux/appStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/utils/firebase";
import {
  clearUserState,
  setUserState,
} from "./components/utils/redux/userSlice";
import Home from "./Home";

const App = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user);
      if (user) {
        // User is signed in
        const { uid, email, displayName } = user;
        dispatch(setUserState({ uid, email, displayName }));
        navigate("/home");
      } else {
        // User is signed out
        dispatch(clearUserState());
        navigate("/");
      }
    });

    // unSubscribe from onAuthStateChanged event listener on unmount
    return () => unSubscribe();
  }, []);
  return (
    <div className="app">
      <main>
        <Routes>
          <Route path="/" element={<Login></Login>} />

          <Route path="/home/*" element={<Home></Home>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
