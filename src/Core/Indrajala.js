import React, { useEffect, useState } from 'react';
import './Indrajala.css';

const Indrajala = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="indrajala-page">
      <div className="app">
        <header>
          <h1>Indrajala</h1>
        </header>
        <main>
          <h2 className={`main-message ${animate ? 'animate' : ''}`}>
            The Wait is Over
          </h2>
          <p className={`sub-message ${animate ? 'animate' : ''}`}>
            Unleash Your Desires
          </p>
          <div className={`tagline ${animate ? 'animate' : ''}`}>
            The  OTT For All Your Fantasies
          </div>
          <p className={`coming-soon ${animate ? 'animate' : ''}`}>
            Coming Soon to Ignite Your Imagination
          </p>
        </main>
        <footer>
          <p>Must be  Indulge responsibly.</p>
        </footer>
      </div>
    </div>
  );
};

export default Indrajala;