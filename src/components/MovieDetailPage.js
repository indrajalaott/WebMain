// MovieDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlay, FaCrown } from 'react-icons/fa'; // Added FaCrown for the premium icon
import {
  Container,
  ImageContainer,
  Image,
  Logo,
  DetailsContainer,
  Title,
  InfoRow,
  Rating,
  Duration,
  AgeLimit,
  Separator,
  Description,
  Starring,
  ButtonContainer,
  Button,
  Loading
} from './MovieDetailStyles'; // Import styled components

const MovieDetailPage = () => {
  const { url } = useParams();
  const [movie, setMovie] = useState(null);
  const [token, setToken] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the token from local storage
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    // Fetch movie details
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.indrajala.in/api/user/movie/${url}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    // Check token expiration
    const checkTokenExpiration = () => {
      const storedExpiryDate = localStorage.getItem('expiryDate');
      const expiryDate = storedExpiryDate ? new Date(storedExpiryDate) : new Date('2000-01-01');
      setExpiryDate(expiryDate);
    };

    fetchMovieDetails();
    checkTokenExpiration();
  }, [url, navigate]);

  if (!movie) return <Loading>Loading...</Loading>;

  const handleViewTrailer = () => {
    if (movie._id) {
      localStorage.setItem('viewIdT', movie.url);
      navigate(`/trailer/`);
    } else {
      console.error('Movie ID is undefined');
    }
  };

  const handleViewMovie = () => {
    if (movie._id) {
      localStorage.setItem('viewId', movie.url);
      navigate(`/Movie/`);
    } else {
      console.error('Movie ID is undefined');
    }
  };

  const handlePurchasePremium = () => {
    // Redirect to the Indrajala orders page
    window.location.href = '/Subscribe';
  };

  const isExpired = expiryDate && expiryDate < new Date();

  return (
    <Container>
      <ImageContainer>
        <Image
          src={`https://api.indrajala.in/public${movie.movieFullImage}`}
          alt={movie.movieName}
          smallSrc={`https://api.indrajala.in/public${movie.smallMovieImage}`}
        />
        <Logo src={`https://api.indrajala.in/public${movie.movieLogoImage}`} alt={`${movie.movieName} Logo`} />
      </ImageContainer>
      <DetailsContainer>
        <Title>{movie.movieName}</Title>
        <InfoRow>
          <Rating>{movie.rating}</Rating>
          <Separator>|</Separator>
          <Duration>{movie.duration}</Duration>
          <Separator>|</Separator>
          <AgeLimit>{movie.ageLimit}</AgeLimit>
        </InfoRow>
        <Description>{movie.description}</Description>
        <Starring>Starring: {movie.starring.join(', ')}</Starring>
        <ButtonContainer>
          {(!token || isExpired) ? (
            <>
              <Button onClick={handleViewTrailer}>
                <FaPlay style={{ marginRight: '8px' }} /> View Trailer
              </Button>
              <Button onClick={handlePurchasePremium} isPremium>
                <FaCrown style={{ marginRight: '8px' }} /> Purchase Premium
              </Button>
            </>
          ) : (
            <Button onClick={handleViewMovie}>
              <FaPlay style={{ marginRight: '8px' }} /> View Movie
            </Button>
          )}
        </ButtonContainer>
      </DetailsContainer>
    </Container>
  );
};

export default MovieDetailPage;
