import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, HoverMovies } from '../utils/api';
import {
  GlobalStyle,
  AppContainer,
  Navbar,
  NavItem,
  MainContent,
  SectionTitle,
  MovieGridContainer,
  MovieItem,
  MovieImage,
  MovieInfo,
  MovieTitle,
  MovieRating,
  MovieDescription,
  WatchNowButton,
  LoadingMessage,
  ErrorMessage,
  HamburgerButton,
  MobileNavOverlay,
  ContentWrapper,
  NavItemsContainer,
  Logo,
  SubscribeButton,
  FeaturedMovieContainer,
  FeaturedMovieItem,
  FeaturedMovieInfo,
  CarouselIndicator,
  CarouselIndicatorDot,
  FeaturedMovieTitle,
  FeaturedMovieDescription,
  ScrollButton
} from './HomePageStyles';

import homeIcon from '../assets/Home.png';
import Profile from '../assets/Profile.png';
import Search from '../assets/Search.png';
import logo from '../assets/logo.png';
import trending from '../assets/trending.png';
import upcoming from '../assets/upcoming.png';
import topfive from '../assets/topfive.png';



const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [hoverMovies, setHoverMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentFeaturedMovie, setCurrentFeaturedMovie] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {


      const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('jwt');
    const expiryDate = urlParams.get('exp');

    if (token && expiryDate) {
      // Save the token and expiry date to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('expiryDate', expiryDate);
    }


    const fetchData = async () => {
      try {
        const [moviesData, hoverMoviesData] = await Promise.all([
          fetchMovies(),
          HoverMovies()
        ]);
        setMovies(moviesData);
        setHoverMovies(hoverMoviesData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = () => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    
    if (!token || (expiryDate && new Date(expiryDate) < new Date())) {
      setIsSubscribed(false);
    } else {
      setIsSubscribed(true);
    }
  };

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

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const handleSubscribe = () => {
    navigate('/subscribe');
  };

  const handleFeaturedMovieChange = (index) => {
    setCurrentFeaturedMovie(index);
  };

  const scrollFeaturedMovie = (direction) => {
    if (direction === 'left') {
      setCurrentFeaturedMovie((prev) => (prev === 0 ? hoverMovies.length - 1 : prev - 1));
    } else {
      setCurrentFeaturedMovie((prev) => (prev === hoverMovies.length - 1 ? 0 : prev + 1));
    }
  };

  if (isLoading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <HamburgerButton onClick={toggleMobileNav}>
          <span></span>
          <span></span>
          <span></span>
        </HamburgerButton>
        <Navbar
          onMouseEnter={() => setIsNavExpanded(true)}
          onMouseLeave={() => setIsNavExpanded(false)}
          isMobileNavOpen={isMobileNavOpen}
        >
          <Logo src={logo} alt="Logo" />
          {!isSubscribed && (
            <SubscribeButton onClick={handleSubscribe}>Subscribe Now</SubscribeButton>
          )}
          <NavItemsContainer>
            <NavItem>
              <img src={homeIcon} alt="" />
              <span aria-label="Home">Home</span>
            </NavItem>
            <NavItem onClick={() => navigate('/Profile')} style={{ cursor: 'pointer' }}>
                <img src={Profile} alt="Profile" />
                <span aria-label="Profile">Profile</span>
            </NavItem>
            <NavItem>
              <img src={Search} alt="" />
              <span aria-label="Search">Search</span>
            </NavItem>
          </NavItemsContainer>
        </Navbar>
        {isMobileNavOpen && <MobileNavOverlay onClick={toggleMobileNav} />}
        <MainContent isNavExpanded={isNavExpanded}>
          <ContentWrapper>
            <FeaturedMovieContainer>
              <ScrollButton 
                onClick={() => scrollFeaturedMovie('left')} 
                direction="left"
                aria-label="Previous featured movie"
              >
                &lt;
              </ScrollButton>
              {hoverMovies.map((movie, index) => (
                <FeaturedMovieItem 
                  key={movie._id} 
                  onClick={() => handleMovieClick(movie.url)}
                  isActive={index === currentFeaturedMovie}
                >
                  <MovieImage src={getFullImageUrl(movie.smallMovieImage)} alt={movie.movieName} />
                  <FeaturedMovieInfo>
                    <FeaturedMovieTitle>{movie.movieName}</FeaturedMovieTitle>
                    <MovieRating> <b> Rating </b> &nbsp;&nbsp; {movie.rating}</MovieRating>
                    <br></br>
                    <span>{movie.category.join(', ')}</span>
                    <FeaturedMovieDescription>{movie.description}</FeaturedMovieDescription>
                  </FeaturedMovieInfo>
                </FeaturedMovieItem>
              ))}
              <ScrollButton 
                onClick={() => scrollFeaturedMovie('right')} 
                direction="right"
                aria-label="Next featured movie"
              >
                &gt;
              </ScrollButton>
            </FeaturedMovieContainer>
            
            <CarouselIndicator>
              {hoverMovies.map((_, index) => (
                <CarouselIndicatorDot 
                  key={index} 
                  isActive={index === currentFeaturedMovie}
                  onClick={() => handleFeaturedMovieChange(index)}
                />
              ))}
            </CarouselIndicator>

            <SectionTitle>
              <img src={trending} alt="Trending" />
            </SectionTitle>
            <MovieGridContainer>
              {movies.map((movie) => (
                <MovieItem 
                  key={movie._id} 
                  onClick={() => handleMovieClick(movie.url)}
                >
                  <MovieImage src={getFullImageUrl(movie.movieMobileImage)} alt={movie.movieName} />
                  <MovieInfo>
                    <MovieTitle>{movie.movieName}</MovieTitle>
                    <MovieRating className="desktop-only">★ {movie.rating}</MovieRating>
                    <MovieDescription>{movie.description}</MovieDescription>
                    <WatchNowButton>Watch Now</WatchNowButton>
                  </MovieInfo>
                </MovieItem>
              ))}
            </MovieGridContainer>

              <br/>
              <SectionTitle>
              <img src={upcoming} alt="Upcoming" />
            </SectionTitle>
            <MovieGridContainer>
              {movies.map((movie) => (
                <MovieItem 
                  key={movie._id} 
                  onClick={() => handleMovieClick(movie.url)}
                >
                  <MovieImage src={getFullImageUrl(movie.movieMobileImage)} alt={movie.movieName} />
                  <MovieInfo>
                    <MovieTitle>{movie.movieName}</MovieTitle>
                    <MovieRating className="desktop-only">★ {movie.rating}</MovieRating>
                    <MovieDescription>{movie.description}</MovieDescription>
                    <WatchNowButton>Watch Now</WatchNowButton>
                  </MovieInfo>
                </MovieItem>
              ))}
            </MovieGridContainer>
            <br/>

            <SectionTitle>
              <img src={topfive} alt="Top 5" />
            </SectionTitle>
            <MovieGridContainer>
              {movies.map((movie) => (
                <MovieItem 
                  key={movie._id} 
                  onClick={() => handleMovieClick(movie.url)}
                >
                  <MovieImage src={getFullImageUrl(movie.movieMobileImage)} alt={movie.movieName} />
                  <MovieInfo>
                    <MovieTitle>{movie.movieName}</MovieTitle>
                    <MovieRating className="desktop-only">★ {movie.rating}</MovieRating>
                    <MovieDescription>{movie.description}</MovieDescription>
                    <WatchNowButton>Watch Now</WatchNowButton>
                  </MovieInfo>
                </MovieItem>
              ))}
            </MovieGridContainer>
            <br/>

           



          </ContentWrapper>
        </MainContent>
      </AppContainer>
    </>
  );
};

export default HomePage;