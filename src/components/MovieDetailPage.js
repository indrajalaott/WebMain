import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa'; // Importing play icon from react-icons

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
  }, [url]);

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

  const isExpired = expiryDate && expiryDate < new Date();
  const isTodayOrFuture = expiryDate && expiryDate >= new Date();

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
            <Button onClick={handleViewTrailer}>
              <FaPlay style={{ marginRight: '8px' }} /> View Trailer
            </Button>
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
    padding: 8px; /* Adjust padding for mobile screens */
  }
`;

const ImageContainer = styled.div`
  position: relative;
  text-align: center;
  border: 2px solid #fff;

  @media (max-width: 768px) {
    margin-bottom: 16px; /* Space between image and content on mobile */
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;

  @media (max-width: 768px) {
    content: ${({ smallSrc }) => `url(${smallSrc})`}; /* Use small image on mobile */
  }
`;

const Logo = styled.img`
  position: absolute;
  left: 5%;
  transform: translate(0%, -50%);
  width: 30%;
  height: auto;
  top: 25%; /* Adjusted position */

  @media (max-width: 768px) {
    top: 20%; /* Adjust logo position for mobile */
  }
`;

const DetailsContainer = styled.div`
  @media (max-width: 768px) {
    position: static; /* Content is outside the image on mobile */
    width: 100%;
    text-align: center; /* Center-align content on mobile */
  }

  position: absolute;
  top: 50%; /* Align content directly below the logo */
  left: 7%; /* Spacing from left */
  width: 90%; /* Adjust width for mobile responsiveness */
  max-width: 600px; /* Set a max width for the details container */
  margin: 0 auto; /* Center the container */
  text-align: left; /* Align text to the left */
`;

const Title = styled.h2`
  margin: 0;
  font-weight: bold; /* Make title bold */

  @media (max-width: 768px) {
    font-size: 24px; /* Adjust font size for mobile */
  }
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center; /* Center align items vertically */
  margin: 12px 0; /* Increased spacing between lines */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack items vertically on mobile */
    align-items: flex-start; /* Align items to the start */
  }
`;

const Rating = styled.p`
  margin: 0;
  @media (max-width: 768px) {
    margin-bottom: 8px; /* Spacing between items on mobile */
  }
`;

const Duration = styled.p`
  margin: 0;
  @media (max-width: 768px) {
    margin-bottom: 8px; /* Spacing between items on mobile */
  }
`;

const AgeLimit = styled.p`
  margin: 0;
  @media (max-width: 768px) {
    margin-bottom: 8px; /* Spacing between items on mobile */
  }
`;

const Separator = styled.span`
  margin: 0 8px; /* Spacing between the items */

  @media (max-width: 768px) {
    display: none; /* Hide the separator on mobile */
  }
`;

const Description = styled.p`
  margin: 12px 0; /* Increased spacing for description */
  font-weight: bold; /* Make description bold */
`;

const Starring = styled.p`
  margin: 12px 0; /* Increased spacing for starring */
  /* No font-weight: bold; to keep it normal */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* Align button to the left */
  margin-top: 16px;

  @media (max-width: 768px) {
    justify-content: center; /* Center buttons on mobile */
  }
`;

const Button = styled.button`
  padding: 14px 40px; /* Increased padding for a larger button */
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center; /* Align items vertically center */
  font-size: 16px; /* Increased font size for better visibility */
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */

  &:hover {
    background-color: #0056b3; /* Darker shade on hover */
  }

  @media (max-width: 768px) {
    padding: 10px 20px; /* Adjust padding for mobile */
    font-size: 14px; /* Adjust font size for mobile */
  }
`;

const Loading = styled.div`
  text-align: center;
  color: #fff;
`;
