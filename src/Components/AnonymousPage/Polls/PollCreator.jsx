import React, { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

const PollCreator = ({ onDone }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleOptionChange = (index, value) => {
    const newOpts = [...options];
    newOpts[index] = value;
    setOptions(newOpts);
  };

  const addOption = () => setOptions([...options, '']);
  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    const formattedPoll = {
      question,
      options: options.filter((opt) => opt.trim() !== '').map((label) => ({ label, votes: 0 })),
      time: new Date().toLocaleTimeString(),
      username: 'username_498',
    };
    onDone(formattedPoll);
  };

  return (
    <div className="bg-yellow-100 p-4 rounded-xl shadow-md w-[350px] space-y-4">
      <div className="text-sm text-gray-600 font-semibold">
        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1"></span>
        <span className="italic font-medium text-black">username_498</span>
      </div>

      <input
        className="w-full p-2 border rounded text-sm"
        placeholder="Enter your poll question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <div className="space-y-2">
        {options.map((opt, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <input
              className="flex-grow p-2 border rounded text-sm"
              placeholder={`Option ${idx + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
            />
            <button onClick={() => removeOption(idx)}>
              <MinusIcon className="w-5 h-5 text-red-500" />
            </button>
          </div>
        ))}
        <button
          onClick={addOption}
          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
        >
          <PlusIcon className="w-4 h-4" />
          Add option
        </button>
      </div>

      <div className="text-sm text-gray-700">
        <span className="inline-flex items-center gap-1">
          🕒 {new Date().toLocaleTimeString()}
        </span>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded text-sm w-full"
      >
        Done
      </button>
    </div>
  );
};

export default PollCreator;
