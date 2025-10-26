import React, { use } from "react";
import "./GptSearchBar.css";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import clientAI from "../utils/openai";
import { addGPTMovies } from "../utils/redux/gptSlice";
// import openai from "../utils/openai";

const GptSearchBar = () => {
  const languageCode = useSelector((state) => state.config.lang);
  const dispatch = useDispatch();
  const searchText = React.useRef("");

  const searchMovieByTMDB = async (query) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&language=en-US&query=${query}&page=1&include_adult=false`
      );
      const jsonData = await data.json();
      return jsonData.results;
    } catch (error) {
      console.error("Error fetching movies from TMDB:", error);
      return [];
    }
  };

  const handleGPTSearchRequest = async () => {
    const query =
      "Act as a movie Recommendation System and suggest some movies for the query: " +
      searchText.current.value +
      ". Only give me the top 5 movie names in a comma separated list, like the example result: Movie1, Movie2, Movie3, Movie4, Movie5";
    console.log("GPT Search Query:", query);
    if (!query) return;
    try {
      // Example usage:

      const response1 = await clientAI.responses.create({
        model: "gpt-4o-mini",
        input: query,
        max_output_tokens: 1000,
      });

      console.log(response1.output_text);
      const gptResult = response1.output_text.split(",");

      // searchMovieByTMDB returns a promise, so we need to handle it accordingly
      const moviesPromise = gptResult.map((movie) =>
        searchMovieByTMDB(movie.trim())
      );
      // Waiting for all TMDB search promises to resolve to get movie results
      const movieResults = await Promise.all(moviesPromise);
      console.log(
        "Movies fetched from TMDB based on GPT suggestions:",
        movieResults
      );
      // Flattening the array to get a single list of movies
      dispatch(addGPTMovies(movieResults.flat()));
    } catch (error) {
      console.error("Error fetching GPT response:", error);
    }
  };

  return (
    <div className="gpt_form_container">
      <form className="gpt_form" onSubmit={(e) => e.preventDefault()}>
        <input
          ref={searchText}
          type="text"
          placeholder={lang[languageCode].searchPlaceholder}
          className="gpt_input"
        />
        <button
          onClick={handleGPTSearchRequest}
          className="gpt_btn bg-blue-500 text-white"
        >
          {lang[languageCode].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
