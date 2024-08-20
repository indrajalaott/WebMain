// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Core/HomePage';
import MovieDetailPage from './components/MovieDetailPage';
import TrailerPage from './components/TrailerPage';
import { ThemeProvider } from 'styled-components';
import theme from './StyleSheets/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/movie/:url" element={<MovieDetailPage />} />
          <Route path="/trailer/*" element={<TrailerPage />} /> {/* Use wildcard for trailer */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;