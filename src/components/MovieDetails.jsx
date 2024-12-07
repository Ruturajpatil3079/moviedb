import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Spinner, Row, Col, Image, Card, Badge } from "react-bootstrap";
import axios from "axios";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false); 
  const [wordLimit, setWordLimit] = useState(300); 

  const API_KEY = import.meta.env.VITE_API_KEY;
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchMovieDetailsAndCast();

    const updateWordLimit = () => {
      const isMobile = window.innerWidth <= 768; 
      setWordLimit(isMobile ? 100 : 300);
    };

    updateWordLimit();
    window.addEventListener("resize", updateWordLimit);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", updateWordLimit);
    };
  }, []);

  const fetchMovieDetailsAndCast = async () => {
    try {
      const movieResponse = await axios.get(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      setMovie(movieResponse.data);

      const castResponse = await axios.get(
        `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
      );
      setCast(castResponse.data.cast.slice(0, 8));

      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie details or cast:", error);
    }
  };

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Container className="mt-4">
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <div
            className="movie-details-banner fade-in"
            style={{
              backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
            }}
          >
            <div className="overlay" />
            <div className="movie-details-content">
              <Row className="align-items-start fade-in">
                <Col md={4}>
                  <Image
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    fluid
                    rounded
                    className="movie-poster"
                  />
                </Col>

                <Col md={8}>
                  <h1>{movie.title}</h1>
                  <p style={{ color: "#00AB66", fontSize: "25px" }}>
                    <strong>Rating:</strong> {movie.vote_average.toFixed(1)} ⭐
                  </p>
                  <p>
                    <strong>Runtime:</strong> <span className="timerounded">{movie.runtime} min</span>  |{" "}
                    <strong>Genres:</strong>{" "}
                    {movie.genres.map((genre) => genre.name).join(", ")}
                  </p>
                  <p>
                    <strong>Release Date:</strong>{" "}
                    {new Date(movie.release_date).toDateString()}
                  </p>
                </Col>

                <h3 className="overview-content">Overview</h3>
                <p>
                  {isExpanded
                    ? movie.overview
                    : `${movie.overview.slice(0, wordLimit)}...`}{" "}
                  <span
                    onClick={toggleReadMore}
                    style={{ color: "blue", cursor: "pointer", fontWeight: "700" }}
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </span>
                </p>
              </Row>
            </div>
          </div>

          <h1 className="mb-4 mt-4">Cast</h1>
          <Row>
            {cast && cast.length > 0 ? (
              cast.map((actor) => (
                <Col md={2} lg={3} sm={6} xs={12} className="mb-4 fade-in" key={actor.id}>
                  <Card className="custom-card">
                    <div className="card-img-wrapper">
                      <Card.Img
                        variant="top"
                        src={
                          actor.profile_path
                            ? `${IMAGE_BASE_URL}${actor.profile_path}`
                            : "https://via.placeholder.com/500x750?text=No+Image"
                        }
                        alt={actor.name}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title className="text-center">{actor.name}</Card.Title>
                      <Card.Text className="text-muted text-center">
                        <strong>Character:</strong> {actor.character}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-white text-center">No cast data available.</p>
            )}
          </Row>
        </>
      )}
    </Container>
  );
}

export default MovieDetails;
