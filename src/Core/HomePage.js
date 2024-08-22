// HomePage.js
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import MovieGrid from '../components/MovieGrid';
import { useNavigate } from 'react-router-dom';
import { fetchMovies } from '../utils/api';
import {
  Container,
  Title,
  MovieGridWrapper,
} from './HomePageStyles';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    const fetchData = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };
    fetchData();
  }, [navigate]);

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