import React from 'react';
import Cover from '../../assets/cover.jpg'
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img 
        src={Cover}
        alt="Majestic waterfall in a lush forest" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-down">
          Discover Your Next Adventure
        </h1>
        <p className="text-xl sm:text-2xl text-white mb-8 max-w-3xl animate-fade-in-up">
          Embark on a journey to explore breathtaking landscapes, immerse in diverse cultures, and create unforgettable memories.
        </p>
        <button className="group bg-white text-gray-800 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 animate-fade-in">
          Start Your Journey
          <ChevronRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Hero;