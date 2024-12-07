import React from "react";
import MovieList from "../common/MovieList";

const Home = () => {
  return <MovieList apiEndpoint="movie/popular" title="Popular Movies" />;
};

export default Home;