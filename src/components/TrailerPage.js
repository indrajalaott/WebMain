// src/pages/TrailerPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const TrailerPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const trailerUrl = queryParams.get('url'); // Get the trailer URL from query parameters

  return (
    <div style={{ position: 'relative', height: '100vh', backgroundColor: 'black' }}>
      {trailerUrl && (
        <video
          style={{ width: '100%', height: '100%' }}
          controls
          autoPlay
          src={trailerUrl}
          onContextMenu={(e) => e.preventDefault()} // Disable right-click context menu
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default TrailerPage;