import React from "react";
import "./GptSearchBar.css";

const GptSearchBar = () => {
  return (
    <div className="gpt_form_container">
      <form className="gpt_form">
        <input
          type="text"
          placeholder="What would you like to watch today?"
          className="gpt_input"
        />
        <button type="submit" className="gpt_btn bg-blue-500 text-white">
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
