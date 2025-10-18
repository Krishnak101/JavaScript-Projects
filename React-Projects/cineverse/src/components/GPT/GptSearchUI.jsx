import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptRecommendation from "./GptRecommendation";
import { BACKGROUND_IMAGE_URL } from "../utils/constants";

const GptSearchUI = () => {
  return (
    <div>
      <div className="w-full h-full z-4 ">
        <GptSearchBar></GptSearchBar>
      </div>
      <div className="absolute top-0 left-0 -z-2 opacity-70 ">
        <img
          src={BACKGROUND_IMAGE_URL}
          alt="Background Image"
          className="w-full h-full object-cover "
        />
      </div>
      <GptRecommendation></GptRecommendation>
    </div>
  );
};

export default GptSearchUI;
