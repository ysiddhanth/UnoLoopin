import React, { useEffect, useRef, useState } from 'react'
import ToggleLoginMode from '../../lambda/HomePage/ToggleButton'
import Logo from '../../lambda/HomePage/Logo'
import Profile from '../../lambda/HomePage/ProfilePic'
import AnonymousChat from '../../lambda/HomePage/AnonymousChat'
import ScrollDown from '../../lambda/HomePage/ScrollDown'
import Resources from '../../lambda/HomePage/Resources'
import ProjectVacancies from '../../lambda/HomePage/ProjectVacancies'

const Opening = () => {
  const [showScroll, setShowScroll] = useState(true)

  // Refs for sections
  const anonymousRef = useRef(null)
  const resourcesRef = useRef(null)
  const projectRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // If any of the three sections are visible, hide scroll-down
        const anyVisible = entries.some(entry => entry.isIntersecting)
        setShowScroll(!anyVisible)
      },
      {
        root: null,
        threshold: 0.3, // 30% visible to count as "seen"
      }
    )

    const targets = [anonymousRef.current, resourcesRef.current, projectRef.current]
    targets.forEach((target) => {
      if (target) observer.observe(target)
    })

    return () => {
      targets.forEach((target) => {
        if (target) observer.unobserve(target)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0f1a2c] text-white relative overflow-hidden">
      {/* Logo and profile */}
      <div className="absolute top-0 left-0">
        <Logo />
      </div>
      <div className="absolute top-0 right-0">
        <Profile />
      </div>

      {/* Welcome section */}
      <div className="flex flex-col items-center justify-center text-center pt-10 px-4">
        <h2 className="text-xl font-semibold underline mb-4 pt-4">Welcome to xxxx</h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug max-w-3xl">
          <span className="text-orange-500">One stop for the whole of</span>
          <br />
          <span className="text-violet-400">IITH campus Community!</span>
        </h1>
        <ToggleLoginMode />
      </div>

      {/* Scroll Down animation */}
      {showScroll && <ScrollDown />}

      {/* Sections with refs */}
      <div ref={anonymousRef} className="-mt-40">
        <AnonymousChat />
      </div>
      <div ref={resourcesRef} className="-mt-40">
        <Resources />
      </div>
      <div ref={projectRef} className="-mt-40">
        <ProjectVacancies />
      </div>
    </div>
  )
}

export default Opening
