import React, { useState } from 'react';
import PollCreator from './PollCreator'; // ✅ adjust path as needed
import { FaPen } from 'react-icons/fa';

const PollApp = () => {
  const [showCreator, setShowCreator] = useState(false);

  const handleDone = (newPoll) => {
    console.log('Poll submitted:', newPoll); // You can use this for further actions
    setShowCreator(false);
  };

  return (
    <div className="min-h-screen bg-[#fde68a] p-4 relative">
      {showCreator && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <PollCreator onDone={handleDone} />
        </div>
      )}

      {!showCreator && (
        <button
          className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg"
          onClick={() => setShowCreator(true)}
        >
          <FaPen className="text-white text-xl" />
        </button>
      )}
    </div>
  );
};

export default PollApp;
