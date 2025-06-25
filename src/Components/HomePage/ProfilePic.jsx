import React from 'react';
import { Link } from 'react-router-dom';
import anonymousChatImg from '../Pictures/AnonymousChat.png';

const ProfilePic = () => {
  return (
    <Link to="/Profile" className="inline-block">
      <div className="w-12 h-12 mr-6 mt-4 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden border-2 border-white">
        <img
          src="/profilepic.png" // ✅ Replace with your profile image path
          alt="ProfilePic"
          className="w-full h-full object-cover"
        />
      </div>
    </Link>
  );
};

export default ProfilePic;
