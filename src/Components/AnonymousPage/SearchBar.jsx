import React, { useState } from 'react'
import { Search } from 'lucide-react'

const SearchBar = () => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Searching for:', query)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-xl mx-auto bg-white/30 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 shadow-lg transition-all focus-within:ring-2 ring-blue-400"
    >
      <Search className="text-gray-600 mr-2" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search anything..."
        className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
      />
      <button
        type="submit"
        className="ml-2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-700 transition"
      >
        Go
      </button>
    </form>
  )
}

export default SearchBar
