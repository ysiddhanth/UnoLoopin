import React from 'react'
import { Bell, Home, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/app-icon.png' // adjust path if needed

const NavBar = () => {
  const navigate = useNavigate()

  return (
    <div className="fixed top-4 left-0 right-0 w-[100%] mx-auto px-10 py-3 flex items-center justify-between z-50">
      {/* Left - App Icon */}
      <div
        className="cursor-pointer flex items-center"
        onClick={() => navigate('/')}
      >
        <img src={logo} alt="App Icon" className="w-[90px] h-[90px]" />
      </div>

      {/* Right - Icons */}
      <div className="flex items-center gap-10 text-white">
        <Home
          size={36}
          className="cursor-pointer hover:text-gray-700"
          onClick={() => navigate('/')}
        />
        <User
          size={36}
          className="cursor-pointer hover:text-gray-700"
          onClick={() => navigate('/profile')}
        />
      </div>
    </div>
  )
}

export default NavBar
