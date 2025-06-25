import React from 'react'
import backgroundImg from '../Components/Pictures/Confessions.png' // Replace with your image path

const Confessions = () => {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      {/* Optional overlay */}
      <div className="w-full h-full bg-black bg-opacity-0 flex items-center justify-center">
        {/* Optional centered content */}
      </div>
    </div>
  )
}

export default Confessions
