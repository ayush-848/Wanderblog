import React from 'react';
import coverImage from '../../assets/cover.jpg';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-container">
      <img className="hero" src={coverImage} alt="hero" />
      <div className="overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">Welcome to WanderBlog</h1>
      </div>
    </div>
  );
};

export default Hero;
