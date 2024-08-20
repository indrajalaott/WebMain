import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import MovieGrid from '../components/MovieGrid';
import { fetchMovies } from '../utils/api';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Title>Corrosil Movies</Title>
      <MovieGrid movies={movies} />
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
`;

const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.title};
`;