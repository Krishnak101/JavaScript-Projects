import React, { use } from "react";
import "./GptSearchBar.css";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const languageCode = useSelector((state) => state.config.lang);
  return (
    <div className="gpt_form_container">
      <form className="gpt_form">
        <input
          type="text"
          placeholder={lang[languageCode].searchPlaceholder}
          className="gpt_input"
        />
        <button type="submit" className="gpt_btn bg-blue-500 text-white">
          {lang[languageCode].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
