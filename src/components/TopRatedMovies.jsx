import React from "react";
import MovieList from "../common/MovieList";

const TopRatedMovies = () => {
  return <MovieList apiEndpoint="movie/top_rated" title="Top Rated Movies" />;
};

export default TopRatedMovies;

