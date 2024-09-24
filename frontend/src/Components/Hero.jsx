import React from 'react';
import coverImage from '../assets/cover.jpg';

const Hero = () => {
  return (
    <div className="relative w-full h-[95vh] overflow-hidden">
      <img className="w-full h-full object-cover" src={coverImage} alt="hero" />
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(55,1,36,0.5)]"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10">
        <h1 className="font-outfit text-[6em] mb-5 mr-[90vh]">Welcome to WanderBlog</h1>
      </div>
    </div>
  );
};

export default Hero;
