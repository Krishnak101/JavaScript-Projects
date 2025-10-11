import React, { useEffect, useState } from "react";
import _ from "lodash";

import "./MovieList.css";
import MovieCard from "./MovieCard";
import FilterGroup from "./FilterGroup";
const api_key = import.meta.env.VITE_TMDB_API_KEY;

const MovieList = ({ type, title, emoji }) => {
  const [data, setData] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });

  useEffect(() => {
    moviesAPI();
  }, [type]);

  // sorting using lodash library
  useEffect(() => {
    if (sort.by != "default") {
      const sortedData = _.orderBy(filteredData, [sort.by], [sort.order]);
      setFilteredData(sortedData);
    }
  }, [sort]);
  const handleFilter = ({ rating }) => {
    if (minRating === rating) {
      setFilteredData(data);
      setMinRating(0);
    } else {
      const filteredList = data.filter((movie) => movie.vote_average >= rating);
      setFilteredData(filteredList);
      setMinRating(rating);
    }
  };

  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };

  const moviesAPI = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${api_key}`
    );
    const movies = await response.json();
    setData(movies.results);
    setFilteredData(movies.results);
  };

  return (
    <section className="movie_list" id={type}>
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          {title}{" "}
          <img src={emoji} alt={`${emoji} emoji`} className="navbar_emoji" />
        </h2>
        <div className="align_center movie_list_fs">
          <FilterGroup
            minRating={minRating}
            onRatingClick={handleFilter}
            ratings={[8, 7, 6]}
          />
          <select
            name="by"
            id=""
            onChange={handleSort}
            value={sort.by}
            className="movie_sorting"
          >
            <option value="default">SortBy</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>
          <select
            name="order"
            id=""
            onChange={handleSort}
            value={sort.order}
            className="movie_sorting"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>
      <div className="movie_cards">
        {filteredData.map((movie) => (
          <MovieCard key={movie.id} movie={movie}></MovieCard>
        ))}
      </div>
    </section>
  );
};

export default MovieList;
