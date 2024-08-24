import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlay, FaCrown } from 'react-icons/fa'; // Added FaCrown for the premium icon

const MovieDetailPage = () => {
  const { url } = useParams();
  const [movie, setMovie] = useState(null);
  const [token, setToken] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the token from local storage
    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
      navigate('/'); // Redirect to home or login page
      // Stop execution if no token
    }
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
    window.location.href = 'https://orders.indrajala.in/';
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

// Styled components
const Container = styled.div`
  padding: 16px;
  color: #fff;
  background-color: #000;
  font-family: 'Times New Roman', Times, serif;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  text-align: center;
  border: 2px solid #fff;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;

  @media (max-width: 768px) {
    content: ${({ smallSrc }) => `url(${smallSrc})`};
  }
`;

const Logo = styled.img`
  position: absolute;
  left: 5%;
  transform: translate(0%, -50%);
  width: 30%;
  height: auto;
  top: 25%;

  @media (max-width: 768px) {
    top: 20%;
  }
`;

const DetailsContainer = styled.div`
  @media (max-width: 768px) {
    position: static;
    width: 100%;
    text-align: center;
  }

  position: absolute;
  top: 50%;
  left: 7%;
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
`;

const Title = styled.h2`
  margin: 0;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Rating = styled.p`
  margin: 0;
  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

const Duration = styled.p`
  margin: 0;
  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

const AgeLimit = styled.p`
  margin: 0;
  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

const Separator = styled.span`
  margin: 0 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Description = styled.p`
  margin: 12px 0;
  font-weight: bold;
`;

const Starring = styled.p`
  margin: 12px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 16px;
  gap: 16px; // Add space between buttons

  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: column; // Stack buttons vertically on mobile
    align-items: center;
  }
`;

const Button = styled.button`
  padding: 14px 40px;
  background-color: ${props => props.isPremium ? '#ffd700' : '#007bff'};
  color: ${props => props.isPremium ? '#000' : '#fff'};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.isPremium ? '#ffcc00' : '#0056b3'};
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
    width: 100%; // Full width on mobile
    justify-content: center;
    margin-bottom: 10px; // Add space between buttons when stacked
  }
`;

const Loading = styled.div`
  text-align: center;
  color: #fff;
`;