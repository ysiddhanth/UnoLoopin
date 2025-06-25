import React from 'react';
import { Link } from 'react-router-dom';
//import logo from '../Pictures/Logo.png';

const Logo = () => {
  return (
    <Link to="/Home" className="inline-block">
      <div className="w-16 h-16 ml-6 mt-4 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden">
        <img
          src="/logo.png" // ✅ Replace with your logo image path
          alt="Logo"
          className="w-12 h-12 ml-6 object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;
