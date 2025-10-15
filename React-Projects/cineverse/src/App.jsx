import React, { use, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import MovieList from "./components/MovieList/MovieList";

import Login from "./components/Login/login";
import appStore from "./components/utils/appStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/utils/firebase";
import { clearUserState, setUserState } from "./components/utils/userSlice";
import Home from "./Home";

const App = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
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
