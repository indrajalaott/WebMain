// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Core/HomePage';
import Login from './Core/Login';
import RegisterPage from './Core/RegisterPage';
import ForgotPassword from './Core/ForgotPassword';
import MoviePage from './components/MoviePage';
import MovieDetailPage from './components/MovieDetailPage';
import TrailerPage from './components/TrailerPage';
import { ThemeProvider } from 'styled-components';
import theme from './StyleSheets/theme';
import LandingPage from './Core/LandingPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/Home" exact element={<HomePage />} />
          <Route path="/movie/:url" element={<MovieDetailPage />} />
          <Route path="/trailer/*" element={<TrailerPage />} /> {/* Use wildcard for trailer */}
          <Route path="/trailer/:movieId" element={<TrailerPage />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<RegisterPage />} />
          <Route path="/Movie/" element={<MoviePage />} />
          <Route path="/Forgot" element={<ForgotPassword />} />
          <Route path="/forgot-password" exact element={<RegisterPage />} />  {/* Forgot Password Route need to be changed */}
          

        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;