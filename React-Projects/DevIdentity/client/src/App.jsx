import { Fragment, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Home/Landing";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import { useSelector } from "react-redux";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Alert from "./components/Home/Alert";

const App = () => {
  const alert = useSelector((state) => state.alert);
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        {alert && <Alert alert={alert}></Alert>}
        <Routes>
          <Route path="/" element={<Landing></Landing>} />
          <Route path="/login" element={<Login />} />
          <Route path="/profiles" element={<Profile />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
