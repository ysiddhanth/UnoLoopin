import React from 'react';
import oneHomeImg from '../Pictures/Home1.png';
import twoHomeImg from '../Pictures/Home2.png';

const InfiniteScrollBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#0f1a2c] overflow-hidden">
      {/* Left side background image */}
      <div
        className="absolute top-0 left-0 w-[400px] h-full bg-repeat-y bg-left bg-contain z-0"
        style={{
          backgroundImage: `url(${twoHomeImg})` // ← your left image
        }}
      ></div>

      {/* Right side background image */}
      <div
        className="absolute top-0 right-0 w-[500px] h-full bg-repeat-y bg-right bg-contain z-0"
        style={{
          backgroundImage: `url(${oneHomeImg})` // ← your right image
        }}
      ></div>

      {/* Content goes above background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default InfiniteScrollBackground;
