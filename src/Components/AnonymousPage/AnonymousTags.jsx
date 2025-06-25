import React from 'react'
import { Link } from 'react-router-dom'
import plus from '../Pictures/plus.png'

const AnonymousTags = ({ onNewPostClick }) => {
  const sections = [
    { label: 'Global Chat', path: '/globalChat' },
    { label: 'Course Reviews', path: '/courseReview' },
    { label: 'Queries', path: '/queries' },
    { label: 'Polls', path: '/polls' },
    { label: 'Confessions?', path: '/confessions' }
  ]

  return (
    <div className="flex flex-col justify-start h-[100vh] pt-10 pb-20 gap-8 text-center bg-[#FF6A3D] rounded-[64px] px-6 w-[300px]">
      <h2 className="text-4xl font-bold italic text-black">Sections</h2>

      {/* New Post Button */}
      <button
        onClick={onNewPostClick}
        className="flex items-center justify-center gap-4 bg-black text-white px-10 py-6 rounded-[34px] font-black text-2xl w-full shadow-lg hover:bg-gray-900 transition duration-200"
      >
        New Post
        <img src={plus} alt="Add" className="w-7 h-7" />
      </button>

      {/* Section Links with Separators */}
      <div className="flex flex-col gap-6 text-white text-2xl font-semibold text-center mt-4 w-full">
        {sections.map((section, index) => (
          <div key={section.label} className="flex flex-col items-center w-full">
            <Link to={section.path} className="hover:underline">
              {section.label}
            </Link>
            {index !== sections.length - 1 && (
              <div className="w-3/4 h-[1px] bg-white opacity-30 mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AnonymousTags
