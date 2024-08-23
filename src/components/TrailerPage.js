import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TrailerPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [trailerUrl, setTrailerUrl] = useState(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const viewIdT = localStorage.getItem('viewIdT');
    if (!viewIdT) {
      navigate('/'); // Redirect to Home page if no viewIdT
    }

    const fetchTrailer = async () => {
    

      try {
        const response = await fetch(`https://api.indrajala.in/api/user/PlayTrailer/${viewIdT}`);
        if (!response.ok) {
          throw new Error('Failed to fetch trailer');
        }
        const data = await response.json();
        const fullTrailerUrl = `https://api.indrajala.in/public${data.trailerVideo}`;
        setTrailerUrl(fullTrailerUrl);
      } catch (error) {
        setError('Error fetching trailer: ' + error.message);
      }
    };

    fetchTrailer();
  }, [movieId, navigate]); // Added navigate to dependencies

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
  };

  const updateProgress = () => {
    const progressValue = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(progressValue);
  };

  return (
    <Container>
      {trailerUrl ? (
        <VideoContainer>
          <video
            ref={videoRef}
            style={{ width: '100%', height: '100%' }}
            src={trailerUrl}
            onError={(e) => setError('Error loading video: ' + e.target.error.message)}
            onContextMenu={(e) => e.preventDefault()}
            controls={false} // Disable default controls
            onTimeUpdate={updateProgress}
          >
            Your browser does not support the video tag.
          </video>
          <Controls>
            <ProgressBar
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
            />
            <ButtonContainer>
              <Button onClick={handlePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              <Button onClick={handleMute}>
                {videoRef.current && videoRef.current.muted ? 'Unmute' : 'Mute'}
              </Button>
            </ButtonContainer>
          </Controls>
        </VideoContainer>
      ) : error ? (
        <Error>{error}</Error>
      ) : (
        <Loading>Loading Trailer...</Loading>
      )}
    </Container>
  );
};

export default TrailerPage;

// Styled components
const Container = styled.div`
  position: relative;
  height: 100vh;
  background-color: black;
`;

const VideoContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 80px; // Move the controls further down
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column; // Stack children vertically
  align-items: center; // Center the children
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex; // Align buttons horizontally
  gap: 10px; // Space between buttons
  margin-top: 10px; // Space above buttons
`;

const Button = styled.button`
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }
`;

const ProgressBar = styled.input`
  -webkit-appearance: none;
  width: 50%; // Set width to 50% for centered effect
  height: 8px; // Height for visibility
  background: #ddd; // Progress bar background
  outline: none;
  opacity: 0.7;
  margin-bottom: 10px; // Margin to separate it from buttons

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    background: #4CAF50;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    background: #4CAF50;
    cursor: pointer;
  }
`;

const Loading = styled.div`
  text-align: center;
  color: #fff;
  margin-top: 20px;
`;

const Error = styled.div`
  text-align: center;
  color: red;
  margin-top: 20px;
`;
