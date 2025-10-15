import React, { use, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import MovieList from "./components/MovieList/MovieList";
import Fire from "./assets/fire.png";
import Star from "./assets/glowing-star.png";
import Party from "./assets/partying-face.png";
import Login from "./components/Login/login";
import appStore from "./components/utils/appStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/utils/firebase";
import { clearUserState, setUserState } from "./components/utils/userSlice";
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
        navigate("/popular");
      } else {
        // User is signed out
        dispatch(clearUserState());
        navigate("/");
      }
    });
  }, []);
  return (
    <div className="app">
      {/* <Navbar></Navbar> */}
      <main>
        <Routes>
          <Route path="/" element={<Login></Login>} />

          <Route
            path="/popular"
            element={
              <MovieList
                type="popular"
                title="Popular"
                emoji={Fire}
              ></MovieList>
            }
          />

          <Route
            path="/top_rated"
            element={
              <MovieList
                type="top_rated"
                title="Top Rated"
                emoji={Star}
              ></MovieList>
            }
          />

          <Route
            path="/upcoming"
            element={
              <MovieList
                type="upcoming"
                title="Upcoming"
                emoji={Party}
              ></MovieList>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
