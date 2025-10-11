import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import MovieList from "./components/MovieList/MovieList";
import Fire from "./assets/fire.png";
import Star from "./assets/glowing-star.png";
import Party from "./assets/partying-face.png";
const App = () => {
  return (
    <div className="app">
      <Navbar></Navbar>
      <main>
        <Routes>
          <Route
            path="/"
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
