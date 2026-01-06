import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Login/Landing";

const App = () => {
  return (
    <>
      <Navbar />
      <Landing />
    </>
  );
};

export default App;
