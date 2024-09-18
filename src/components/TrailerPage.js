import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TrailerPage.css';

const TrailerPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [trailerUrl, setTrailerUrl] = useState(null);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  useEffect(() => {
    const viewIdT = localStorage.getItem('viewIdT');
    if (!viewIdT) {
      navigate('/');
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
  }, [movieId, navigate]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
        hideControlsAfterDelay();
      }
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * videoRef.current.duration;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const updateProgress = () => {
    if (videoRef.current) {
      const progressValue = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progressValue);
      setCurrentTime(formatTime(videoRef.current.currentTime));
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(formatTime(videoRef.current.duration));
    }
  };

  const handleSkip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const handleSingleTap = () => {
    setControlsVisible(true);
    handlePlayPause();
  };

  const hideControlsAfterDelay = () => {
    setTimeout(() => {
      if (isPlaying) {
        setControlsVisible(false);
      }
    }, 5000);
  };

  const ControlPanel = () => (
    <div className={`controls ${controlsVisible ? 'visible' : 'hidden'}`}>
      <div className="progress-fullscreen">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="progress-bar"
        />
        <button onClick={toggleFullScreen} className="fullscreen-button">
          {isFullScreen ? '⤓' : '⤢'}
        </button>
      </div>
      <div className="button-container">
        <button onClick={() => handleSkip(-10)}>⏪</button>
        <button onClick={handlePlayPause}>{isPlaying ? '❚❚' : '▶'}</button>
        <button onClick={() => handleSkip(10)}>⏩</button>
        <div className="volume-control">
          <button onClick={handleMute}>{isMuted ? '🔇' : '🔊'}</button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
        <span className="time-display">{currentTime} / {duration}</span>
      </div>
    </div>
  );

  return (
    <div className="container" ref={containerRef} onClick={handleSingleTap}>
      {trailerUrl ? (
        <div className="video-container">
          <video
            ref={videoRef}
            src={trailerUrl}
            onError={(e) => setError('Error loading video: ' + e.target.error.message)}
            onTimeUpdate={updateProgress}
            onLoadedMetadata={handleLoadedMetadata}
          >
            Your browser does not support the video tag.
          </video>
          <ControlPanel />
        </div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="loading">Loading Trailer...</div>
      )}
    </div>
  );
};

export default TrailerPage;
