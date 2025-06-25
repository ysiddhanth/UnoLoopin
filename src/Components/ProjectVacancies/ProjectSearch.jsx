import React from 'react';
import { Search } from 'lucide-react';

const ProjectSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="bg-[#F7F4E9] rounded-[20px] px-8 py-5 mx-auto w-[1291px] flex items-center shadow-md">
      <Search className="text-gray-500 mr-4 w-5 h-5" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for any project tags..."
        className="flex-1 bg-transparent text-black placeholder-gray-500 outline-none text-base font-medium"
      />
    </div>
  );
};

export default ProjectSearch;
