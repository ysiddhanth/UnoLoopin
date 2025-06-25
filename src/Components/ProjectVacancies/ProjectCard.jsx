import React from 'react'
import { User, Users } from 'lucide-react'

const ProjectCard = ({
  title,
  professor,
  skills = [],
  startDate,
  endDate,
  vacancy = 1,
  avatar = 'https://i.pravatar.cc/150?img=3',
  onKnowMore,
  onApply
}) => {
  return (
    <div className="flex items-center bg-[#F7F4E9] shadow-xl rounded-[63px] px-8 py-6 gap-6 w-full max-w-4xl mx-auto">
      
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-[90px] h-[90px] rounded-full border-[6px] border-black flex items-center justify-center overflow-hidden">
          <img
            src={avatar}
            alt="professor"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Project Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-black text-black mb-1">{title}</h2>
          <p className="text-lg font-semibold text-black mb-2">{professor}</p>
          <p className="text-sm text-black mb-1">
            <strong>Skills Required :</strong> {skills.join(', ')}
          </p>
          <p className="text-sm text-black mb-2">
            <strong>Duration :</strong> {startDate} - {endDate}
          </p>

          {/* Vacancy Icons */}
          <div className="flex items-center gap-1">
            {[...Array(vacancy)].map((_, i) => (
              <User key={i} className="w-4 h-4 text-black" />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4 justify-end">
          <button
            onClick={onKnowMore}
            className="px-4 py-2 text-sm bg-[#3CBCC3] text-white rounded-[10px] font-bold hover:brightness-95 transition border-[3px] border-black"
          >
            Know more...
          </button>
          <button
            onClick={onApply}
            className="px-4 py-2 text-sm bg-[#FF6A3D] text-white rounded-[10px] font-bold hover:brightness-90 transition border-[3px] border-black"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
