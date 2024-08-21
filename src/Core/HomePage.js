import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import MovieGrid from '../components/MovieGrid';
import { useNavigate } from 'react-router-dom';
import { fetchMovies } from '../utils/api';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to home or login page
      // Stop execution if no token
    }
    const fetchData = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };
    fetchData();
  }, [navigate]); // Add navigate to the dependency array

  return (
    <Container>
      <Title>Indrajala, The OTT Of Your Fantasies</Title>
      <MovieGridWrapper isMobile={isMobile} isTablet={isTablet}>
        <MovieGrid movies={movies} isMobile={isMobile} isTablet={isTablet} />
      </MovieGridWrapper>
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  padding: 20px; /* Set a fixed padding for consistency */
  background: linear-gradient(to bottom, #000000 50%, #ff69b4 100%); /* Black to Pink gradient */
  min-height: 100vh; /* Ensure the container takes up full viewport height */
`;

const Title = styled.h1`
  text-align: center;
  color: #ffffff; /* White color for better contrast against dark background */
  margin-bottom: 20px; /* Fixed margin for consistency */
`;

const MovieGridWrapper = styled.div`
  display: flex;
  justify-content: ${({ isMobile, isTablet }) => (isMobile ? 'center' : isTablet ? 'space-around' : 'space-between')};
  align-items: center;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  overflow-y: ${({ isMobile }) => (isMobile ? 'scroll' : 'unset')};
  padding: 10px; /* Reduced padding for better visibility */
  background: transparent; /* Remove shading for better visibility */
  border-radius: 0; /* No border radius for a sharper look */
  gap: 20px; /* Fixed gap for consistency */
  width: 100%;
  height: ${({ isMobile }) => (isMobile ? '100vh' : 'auto')}; /* Full screen height on mobile */
  scroll-behavior: smooth;

  > div {
    flex: ${({ isMobile }) => (isMobile ? '0 0 auto' : '1')};
    max-width: ${({ isMobile, isTablet }) => (isMobile ? '100%' : isTablet ? '45%' : 'none')};
    width: ${({ isMobile, isTablet }) => (isMobile || isTablet ? '100%' : 'auto')}; /* Ensure movies take full width on smaller screens */
    background: transparent; /* Ensure movie boxes have no background shading */
    border: 1px solid #ff69b4; /* Optional: Add a pink border to movie boxes */
    border-radius: 5px; /* Optional: Slightly rounded corners for movie boxes */
    color: #ffffff; /* White text for better readability */
    padding: 10px; /* Padding inside each movie box */
  }

  /* Hide scrollbar for modern browsers */
  &::-webkit-scrollbar {
    width: 8px; /* Adjusted for vertical scrolling */
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  /* Hide scrollbar for Internet Explorer, Edge, and Firefox */
  -ms-overflow-style: scrollbar; /* IE and Edge */
  scrollbar-width: thin; /* Firefox */
`;