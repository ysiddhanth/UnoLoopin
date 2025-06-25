import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import ProjectCard from '../Components/ProjectVacancies/ProjectCard'
import backgroundImg from '../Components/Pictures/staticBackground.png';
import CreateProjectOverlay from '../Components/ProjectVacancies/ProjectOverlay'
import ProjectSearch from '../Components/ProjectVacancies/ProjectSearch'
import { Plus } from 'lucide-react'

const ProjectVacancies = () => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

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
          startDate: data.startDate?.toDate?.().toLocaleDateString() || '',
          endDate: data.endDate?.toDate?.().toLocaleDateString() || '',
          uploadDate: data.uploadDate?.toDate?.().toLocaleDateString() || '',
          skills: data.skills || [],
          vacancies: data.vacancies || 0,
          avatar: data.avatar || 'https://i.pravatar.cc/150?img=10'
        }
      })
      
      setProjects(projectList)
      setFilteredProjects(projectList)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProjects(projects)
    } else {
      const lowerTerm = searchTerm.toLowerCase()
      const filtered = projects.filter(p =>
        p.title?.toLowerCase().includes(lowerTerm) ||
        p.creator?.toLowerCase().includes(lowerTerm) ||
        p.description?.toLowerCase().includes(lowerTerm) ||
        p.aim?.toLowerCase().includes(lowerTerm) ||
        (p.skills && p.skills.some(skill => skill.toLowerCase().includes(lowerTerm)))
      )
      setFilteredProjects(filtered)
    }
  }, [searchTerm, projects])

  const handleCloseModal = () => {
    setShowCreateModal(false)
    fetchProjects()
  }

  return (
    <div className="min-h-screen bg-[#0F172A] py-10 px-6 flex flex-col gap-8 items-center relative" 
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '35%',
      }}>
      {/* Search Bar */}
      <ProjectSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Project Cards */}
      {filteredProjects.length === 0 ? (
        <p className="text-white text-lg">No matching projects found.</p>
      ) : (
        filteredProjects.map(proj => (
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

      {/* Create Button */}
      <button
        className="fixed bottom-6 right-6 bg-[#3CBCC3] text-white font-black text-4xl px-10 py-6 rounded-[25px] shadow-xl flex items-center gap-3 hover:bg-[#1ab7af] transition"
        onClick={() => setShowCreateModal(true)}
      >
        Create
        <Plus size={32} />
      </button>


      {/* Create Modal */}
      {showCreateModal && (
        <CreateProjectOverlay onClose={handleCloseModal} />
      )}
    </div>
  )
}

export default ProjectVacancies
