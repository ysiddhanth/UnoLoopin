import React, { useEffect, useRef, useState } from 'react'

import ScrollDown from '../Components/HomePage/InfiniteScrollDown.jsx'
import AnonymousChat from '../Components/HomePage/AnonymousChat.jsx'
import Resources from '../Components/HomePage/Resources.jsx'
import Logo from '../Components/HomePage/Logo.jsx'
import Profile from '../Components/HomePage/ProfilePic.jsx'
import ToggleLoginMode from '../Components/HomePage/ToggleButton.jsx'
import ProjectVacancies from '../Components/HomePage/ProjectVacancies.jsx'
import backgroundImg from '../Components/Pictures/staticBackground.png';
import Footer from '../Components/HomePage/Footer'


const HomePage = () => {
  const [showScroll, setShowScroll] = useState(true)
  const anonymousRef = useRef(null)
  const resourcesRef = useRef(null)
  const projectRef = useRef(null)

  return (
    <>
      <div
        className="min-h-screen bg-[#18223B] text-white flex relative flex-col items-center justify-center bg-contain bg-center bg-no-repeat px-4 md:px-16 py-10"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '30%',
        }}
      >
        <div className="absolute top-0 left-0">
          {/* <Logo /> */}
        </div>
        <div className="absolute top-0 right-0">
          {/* <Profile /> */}
        </div>

        <div className="bg-[#18223B] bg-opacity-100 rounded-[106px] w-[1100px] relative">
          <div className="flex flex-col items-center justify-center text-center pt-90 px-40">
            <h2 className="text-4xl font-black mb-[30px] pt-4">Welcome to UNOLoopin</h2>
            <h1 className="text-[20pt] sm:text-5xl md:text-[50px] font-black leading-snug max-w-3xl">
              <span className="text-orange-500">One stop for the whole of</span>
              <br />
              <span className="text-violet-400">IITH Campus Community!</span>
            </h1>
            <ToggleLoginMode />
          </div>

          <div ref={anonymousRef} className="-mt-40">
            <AnonymousChat />
          </div>
          <div ref={resourcesRef} className="-mt-40">
            <Resources />
          </div>
          <div ref={projectRef} className="-mt-40">
            <ProjectVacancies />
          </div>
          <Footer />

        </div>

      </div>

      {/* Footer below the main page */}
    </>
  )
}


export default HomePage