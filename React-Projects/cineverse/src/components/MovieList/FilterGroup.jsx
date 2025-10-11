import React from "react";

const FilterGroup = ({ minRating, onRatingClick, ratings }) => {
  return (
    <ul className=" align_center movie_filter">
      {ratings.map((rating) => (
        <li
          className={
            minRating == { rating }
              ? "movie_filter_item active"
              : "movie_filter_item"
          }
          key={rating}
          onClick={() => {
            onRatingClick({ rating });
          }}
        >
          {" " + rating}+ Star
        </li>
      ))}
    </ul>
  );
};

export default FilterGroup;
