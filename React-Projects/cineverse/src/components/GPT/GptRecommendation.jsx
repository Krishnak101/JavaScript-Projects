import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../MovieList/MovieCard";

const GptRecommendation = () => {
  const { gptMovies } = useSelector((state) => state.gpt);
  if (!gptMovies || gptMovies.length === 0) {
    console.log("No GPT Movies Available");
    return <div>No Recommendations Available</div>;
  }

  return (
    <div className="movie_cards">
      {gptMovies.map((movie, index) => (
        <MovieCard key={index} movie={movie}></MovieCard>
      ))}
    </div>
  );
};

export default GptRecommendation;
