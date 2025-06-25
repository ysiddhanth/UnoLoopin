import React, { useEffect, useState } from 'react';
import { FaClock, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const initialOptions = [
  { label: 'Yes, I agree', votes: 5 },
  { label: 'No, I disagree', votes: 15 },
  { label: 'Neutral', votes: 10 },
  { label: 'Petition to change the menu', votes: 70 },
];

const VoteCard = () => {
  const [options, setOptions] = useState(initialOptions);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [votedIndex, setVotedIndex] = useState(null);
  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        setSelectedIndex((prev) => (prev + 1) % options.length);
      } else if (e.key === 'ArrowUp') {
        setSelectedIndex((prev) => (prev - 1 + options.length) % options.length);
      } else if (e.key === 'Enter') {
        handleVote();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleVote = () => {
    if (votedIndex === selectedIndex) return;

    const updatedOptions = options.map((opt, i) => {
      if (i === selectedIndex) return { ...opt, votes: opt.votes + 1 };
      if (i === votedIndex) return { ...opt, votes: Math.max(0, opt.votes - 1) };
      return opt;
    });

    setOptions(updatedOptions);
    setVotedIndex(selectedIndex);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-yellow-100 rounded-xl shadow-md space-y-4">
      <div className="flex justify-between items-center text-sm text-gray-600 font-semibold">
        <span>
          <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1"></span>
          <span className="italic font-medium text-black">username_498</span>
        </span>
        <span>Tue, 2:42 pm</span>
      </div>
      <div className="text-black font-medium">
        I don't like the veg jalfrezi on the menu.
      </div>
      <div className="space-y-2">
        {options.map((option, index) => {
          const percent = totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100);
          const isSelected = selectedIndex === index;
          const isVoted = votedIndex === index;

          return (
            <div
              key={option.label}
              className={`p-1 rounded-md border border-gray-300 relative transition-colors duration-150 ${
                isSelected ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              <div
                className="absolute top-0 left-0 h-full bg-black opacity-20 z-0"
                style={{ width: `${percent}%` }}
              ></div>
              <div className="relative z-10 flex justify-between items-center px-2">
                <span className="font-medium">
                  {option.label} {isVoted ? '✅' : ''}
                </span>
                <span className="text-sm text-gray-500">{percent}%</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center text-sm mt-4">
        <div className="flex space-x-4 text-gray-700">
          <FaArrowUp className="cursor-pointer" onClick={() =>
            setSelectedIndex((prev) => (prev - 1 + options.length) % options.length)
          } />
          <FaArrowDown className="cursor-pointer" onClick={() =>
            setSelectedIndex((prev) => (prev + 1) % options.length)
          } />
        </div>

        <div className="flex items-center gap-1 text-gray-700">
          <FaClock />
          <span>Tue, 10:00 pm</span>
        </div>

        <button
          className="bg-black text-white text-xs px-4 py-1 rounded-md hover:bg-gray-800"
          onClick={handleVote}
        >
          {votedIndex === null ? 'Add Vote' : 'Update Vote'}
        </button>
      </div>
    </div>
  );
};

export default VoteCard;
