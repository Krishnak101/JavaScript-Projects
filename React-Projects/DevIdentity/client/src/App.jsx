import { Fragment, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Home/Landing";
import Register from "./components/Login/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing></Landing>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profiles" element={<Profile />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
