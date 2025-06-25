import React from 'react'
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Heart,
  MinusCircle,
  Archive
} from 'lucide-react'

const CourseReviewCard = ({ username, title, time, likes, comments }) => {
  return (
    <div className="bg-[#F7F4E9] rounded-[40px] p-6 w-full shadow-md">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 font-semibold italic text-sm text-black">
          <div className="w-3 h-3 bg-red-600 rounded-full"></div>
          <span className="text-sm">@{username}</span>
        </div>
        <span className="text-sm text-black">{time}</span>
      </div>

      {/* Title / Question */}
      <div className="text-black text-md md:text-lg font-semibold mb-4">
        {title}
      </div>

      {/* Icons */}
      <div className="flex items-center gap-6 text-black">
        <div className="flex items-center gap-1">
          <Heart className="w-4 h-4" />
          <span>{likes}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" />
          <span>{comments?.length || 0}</span>
        </div>
      </div>
    </div>
  )
}

export default CourseReviewCard
