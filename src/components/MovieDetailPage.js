import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetailPage = () => {
  const { url } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`https://api.indrajala.in/api/user/movie/${url}`);
      const data = await response.json();
      setMovie(data);
    };
    fetchMovieDetails();
  }, [url]);

  if (!movie) return <Loading>Loading...</Loading>;

  const handleViewTrailer = () => {
    navigate(`/trailer/${movie._id}`); // Pass only the movie ID as a path parameter
  };
  

  return (
    <Container>
      <Title>{movie.movieName}</Title>
      <Image src={`https://api.indrajala.in/public${movie.movieFullImage}`} alt={movie.movieName} />
      <Details>
        <Rating>Rating: {movie.rating}</Rating>
        <AgeLimit>Age Limit: {movie.ageLimit}</AgeLimit>
        <Description>{movie.description}</Description>
        <Duration>Duration: {movie.duration}</Duration>
        <Starring>Starring: {movie.starring.join(', ')}</Starring>
        <Category>Category: {movie.category.join(', ')}</Category>
        <ButtonContainer>
          <Button onClick={() => window.open(`https://api.indrajala.in/public/${movie.url}`, '_blank')}>View Movie</Button>
          <Button onClick={handleViewTrailer}>View Trailer</Button>
        </ButtonContainer>
      </Details>
    </Container>
  );
};

export default MovieDetailPage;

const Container = styled.div`
  padding: 16px;
  color: #fff;
  background-color: #000;
`;

const Title = styled.h1`
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Details = styled.div`
  margin-top: 16px;
`;

const Rating = styled.p``;

const AgeLimit = styled.p``;

const Description = styled.p``;

const Duration = styled.p``;

const Starring = styled.p``;

const Category = styled.p``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const Button = styled.button`
  margin: 0 8px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Loading = styled.div`
  text-align: center;
  color: #fff;
`;
