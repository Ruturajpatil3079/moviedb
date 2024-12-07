import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { setMovies, setLoading } from '../Services/movieSlice';

function SearchResults() {
  const dispatch = useDispatch();
  const { searchQuery, movies, loading } = useSelector((state) => state.movies);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) return;

      try {
        dispatch(setLoading(true));
        const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}`
        );
        dispatch(setMovies({ movies: response.data.results, totalPages: response.data.total_pages }));
        dispatch(setLoading(false));
      } catch (error) {
        console.error('Error fetching search results:', error);
        dispatch(setLoading(false));
      }
    };

    fetchSearchResults();
  }, [searchQuery, dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Row>
      {movies.map((movie) => (
        <Col xs={12} sm={6} md={4} lg={3} key={movie.id}>
          <Card className="movie-card mb-4">
            <Card.Img
              variant="top"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>Rating: {movie.vote_average?.toFixed(1) || 'N/A'} ⭐</Card.Text>
              <Card.Text>Year: {new Date(movie.release_date).getFullYear()}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default SearchResults;
