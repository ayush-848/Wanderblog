import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full border-t-cyan-400 border-solid"></div>
    </div>
  );
};

export default Loader;
