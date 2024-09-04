import React from 'react';
import './Broken.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Broken = () => {
  return (
    <div className="broken-page">
      <Navbar />
      <div className="broken-container">
        <div className="broken-content">
          <h1>Something Terribly Went Wrong</h1>
          <p>But don't worry, we will be checking what happened.</p>
          <p>We will get back to you soon.</p>
          <p className="apology">Sorry for the inconvenience caused.</p>
          <br/>
          <h1>Team INDRAJALA</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Broken;