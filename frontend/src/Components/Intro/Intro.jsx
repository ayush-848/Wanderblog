import React from 'react';
import videoSrc from '../../assets/Intro_video.mp4';

const Intro = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Text Overlay */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full text-left text-white p-8 md:p-16">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 animate-fadeIn">
          Welcome, Adventurer!
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl animate-fadeIn">
          Join us on a journey as we explore the beauty of the world. Share your chronicles and become part of a community 
          where travel stories come alive.
        </p>
        <button className="px-8 py-3 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
          Start Exploring
        </button>
      </div>

      {/* About Section */}
      <div className="max-w-3xl mx-auto text-center text-black p-6 mt-12 bg-white rounded-lg shadow-lg relative z-10">
        <h2 className="text-3xl font-semibold mb-2">About Us</h2>
        <p className="text-md md:text-lg">
          We are a community of passionate travelers and adventurers. Our mission is to inspire and guide fellow explorers 
          on their journeys across the globe. Whether you're a seasoned globetrotter or planning your first trip, we're 
          here to share experiences, tips, and stories that will fuel your wanderlust.
        </p>
      </div>
    </div>
  );
};

export default Intro;
