import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { fetchMovies } from '../utils/api';
import {
  GlobalStyle,
  Container,
  Title,
  MovieGridWrapper,
  MovieGridContainer,
  MovieItem,
  MovieImage,
  MovieInfo,
  MovieTitle,
  MovieRating,
  MovieDescription,
  MovieCategory,
  LoadingMessage,
  ErrorMessage
} from './HomePageStyles';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (isLoading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  const getFullImageUrl = (imagePath) => {
    const baseUrl = 'https://api.indrajala.in/public';
    if (imagePath.startsWith('https://')) {
      return imagePath;
    } else {
      const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
      const encodedPath = cleanPath.split('/').map((part, index, array) => {
        return index === array.length - 1 ? encodeURIComponent(part) : part;
      }).join('/');
      return `${baseUrl}/${encodedPath}`;
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title isMobile={isMobile}>Indrajala, The OTT Of Your Fantasies</Title>
        <MovieGridWrapper>
          <MovieGridContainer>
            {movies.map((movie) => (
              <MovieItem 
                key={movie._id} 
                onClick={() => handleMovieClick(movie.url)}
                style={{ cursor: 'pointer' }}
              >
                <MovieImage src={getFullImageUrl(movie.movieFullImage)} alt={movie.movieName} />
                <MovieInfo>
                  <MovieTitle>{movie.movieName}</MovieTitle>
                  <MovieRating>Rating: {movie.rating}</MovieRating>
                  <MovieDescription>{movie.description}</MovieDescription>
                  <MovieCategory><b>Category: </b>{movie.category.join(', ')}</MovieCategory>
                </MovieInfo>
              </MovieItem>
            ))}
          </MovieGridContainer>
        </MovieGridWrapper>
      </Container>
    </>
  );
};

export default HomePage;