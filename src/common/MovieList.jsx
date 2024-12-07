import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MovieList = ({ apiEndpoint, title }) => {
  const searchQuery = useSelector((state) => state.movies.searchQuery);

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const Api_key = import.meta.env.VITE_API_KEY;
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchMovies = async (query, page) => {
    let apiUrl;

    if (query) {
      apiUrl = `${BASE_URL}/search/movie?api_key=${Api_key}&language=en-US&page=${page}&query=${query}`;
    } else {
      apiUrl = `${BASE_URL}/${apiEndpoint}?api_key=${Api_key}&language=en-US&page=${page}`;
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
  };

  useEffect(() => {
    fetchMovies(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">
        {searchQuery ? `Showing Result for: ${searchQuery}` : title}
      </h1>
      <Row>
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <Col xs={12} sm={12} md={4} lg={3} className="mb-4 p-3" key={movie.id}>
              <Card className="movie-card">
                <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <Card.Img variant="top" src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                  <Card.Body>
                    <Card.Title className="truncate-title">{movie.title}</Card.Title>
                    <Card.Text className="text-muted">
                      Rating: {movie.vote_average.toFixed(1)} ⭐
                    </Card.Text>
                    <Card.Text className="text-muted">
                      Year: {new Date(movie.release_date).getFullYear()}
                    </Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <p>No movies found</p>
          </Col>
        )}
      </Row>
      <Row>
        <Col className="d-flex justify-content-center mb-4">
          <Button onClick={handlePrevious} disabled={currentPage === 1} className="mx-2">
            Previous
          </Button>
          <span className="align-self-center">
            Page {currentPage} of {totalPages}
          </span>
          <Button onClick={handleNext} disabled={currentPage === totalPages} className="mx-2">
            Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieList;
