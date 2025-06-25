import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ToggleLoginMode = () => {
  const [mode, setMode] = useState(null); // null so neither is selected at first
  const navigate = useNavigate();

  const handleClick = (selectedMode) => {
    if (mode === selectedMode) {
      // Double click behavior
      if (selectedMode === 'anonymous') {
        navigate('/anonymousLogin');
      } else {
        navigate('/verifiedLogin');
      }
    } else {
      // First click just selects
      setMode(selectedMode);
    }
  };

  return (
    <div className="flex justify-center my-12">
      <div className="relative flex w-full bg-[#F7F4E9] max-w-md min-w-[800px] h-20 border-[10px] border-[#9DAAF2] rounded-[26px] overflow-hidden shadow-xl">

        {/* Background highlight */}
        <div
          className={`absolute top-0 bottom-0 transition-all duration-300 rounded-[10px] z-0 ${
            mode === 'anonymous' ? 'left-0 w-1/2 bg-[#FF6A3D] bg-opacity-100' :
            mode === 'verified' ? 'left-1/2 w-1/2 bg-[#FF6A3D] bg-opacity-100' :
            ''
          }`}
        ></div>

        {/* Buttons */}
        <div className="flex w-full relative z-10">
          <button
            onClick={() => handleClick('anonymous')}
            className={`flex items-center justify-center gap-2 w-1/2 text-2xl font-black transition-all ${
              mode === 'anonymous' ? 'text-blue-700' : 'text-gray-500'
            }`}
          >
            Anonymous
          </button>

          <button
            onClick={() => handleClick('verified')}
            className={`flex items-center justify-center gap-2 w-1/2 text-2xl font-black transition-all ${
              mode === 'verified' ? 'text-green-700' : 'text-gray-500'
            }`}
          >
            Verified
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleLoginMode;
