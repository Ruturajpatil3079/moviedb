import React from "react";
import MovieList from "../common/MovieList";

const UpcomingMovies = () => {
  return <MovieList apiEndpoint="movie/upcoming" title="Upcoming Movies" />;
};

export default UpcomingMovies;
