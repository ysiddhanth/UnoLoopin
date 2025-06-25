import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import ProjectCard from './ProjectCard'

const Projects = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'projectVacancies'))
        const projectList = snapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            title: data.title || 'Untitled Project',
            creator: data.creator || 'Unknown',
            aim: data.aim || '',
            description: data.description || '',
            startDate: data.startDate?.toDate().toLocaleDateString() || '',
            endDate: data.endDate?.toDate().toLocaleDateString() || '',
            uploadDate: data.uploadDate?.toDate().toLocaleDateString() || '',
            skills: data.skills || [],
            vacancies: data.vacancies || 0,
            avatar: data.avatar || 'https://i.pravatar.cc/150?img=10'
          }
        })
        setProjects(projectList)
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }

    fetchProjects()
  }, [])

  return (
    <div className="min-h-screen bg-[#0F172A] py-10 px-6 flex flex-col gap-8 items-center">
      {projects.length === 0 ? (
        <p className="text-white text-lg">Loading projects...</p>
      ) : (
        projects.map((proj, index) => (
          <ProjectCard
            key={proj.id}
            title={proj.title}
            professor={proj.creator}
            skills={proj.skills}
            startDate={proj.startDate}
            endDate={proj.endDate}
            aim={proj.aim}
            description={proj.description}
            uploadDate={proj.uploadDate}
            vacancy={proj.vacancies}
            avatar={proj.avatar}
            onKnowMore={() => console.log('Know more about:', proj.title)}
            onApply={() => console.log('Apply to:', proj.title)}
          />
        ))
      )}
    </div>
  )
}

export default Projects
