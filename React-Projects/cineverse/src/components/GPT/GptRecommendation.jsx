import React from "react";
import { useSelector } from "react-redux";
import MovieList from "../MovieList/MovieList";

const GptRecommendation = () => {
  const { gptMovieNames, gptResults } = useSelector((state) => state.gpt);
  if (!gptResults || gptResults.length === 0) {
    return null;
  }

  return (
    <div className="movie_cards bg-black">
      {gptMovieNames.map((movieName, index) => (
        <MovieList
          key={index}
          type={movieName.trim()}
          title={movieName.trim()}
          movieList={gptResults[index]}
        ></MovieList>
      ))}
    </div>
  );
};

export default GptRecommendation;
