import React from 'react'
import { Search, RefreshCw } from 'lucide-react'

const CourseSearch = ({ searchTerm, setSearchTerm, onRefresh }) => {
  return (
    <div className="flex items-center justify-between bg-[#00C2CB] px-8 py-6 rounded-t-[60px]">
      {/* Search Bar */}
      <div className="relative w-full max-w-4xl">
        <Search
          className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-600"
          size={28}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for tags/ course codes/ names/ opinions..."
          className="w-full pl-16 pr-6 py-4 rounded-full bg-[#F7F4E9] text-gray-900 text-lg outline-none placeholder-gray-500 font-medium"
        />
      </div>

      {/* Refresh Button */}
      <button
        onClick={onRefresh}
        className="ml-6 flex items-center gap-3 bg-[#F9DC5C] text-black font-bold text-lg px-6 py-4 rounded-full shadow hover:bg-[#f7ce27] transition"
      >
        Latest Reviews
        <RefreshCw size={24} />
      </button>
    </div>
  )
}

export default CourseSearch
