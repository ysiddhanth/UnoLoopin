import React from 'react'

const FooterTeamCard = ({ name, photo, email, instagram, role }) => {
  return (
    <div className="mx-auto flex items-center gap-10 p-6 bg-[#F7F4E9] rounded-2xl shadow-lg w-full max-w-3xl">
      {/* Larger square photo with black border */}
      <div className="w-32 h-32 border-4 border-black overflow-hidden rounded-md">
        <img src={photo} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex flex-col text-black text-lg gap-1">
        <h3 className="text-2xl font-bold">{name}</h3>
        <p className="">{email}</p>
        <p className=""> @{instagram}</p>
        <p className="font-semibold italic">{role}</p>
      </div>
    </div>
  )
}

export default FooterTeamCard
