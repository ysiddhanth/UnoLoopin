import React from 'react'
import { Link } from 'react-router-dom'
import projectImg from '../Pictures/ProjectVacancies.png'
import TopicBox from './TopicBox'
const ProjectVacancies = () => {
  return (
    <>
    <TopicBox Name = "Project Vacancies" Heading = "Fuel for the curious" buttonLink = "/projectVacancies" loginLink = "/verifiedLogin" buttonText = " APPLY" bgImg = {projectImg} Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lacus lacus, porta eget velit eget, gravida consequat mauris. Nam tincidunt justo in felis faucibus, sit amet accumsan neque mollis. Integer eu leo ut sapien ullamcorper placerat et eu neque. Curabitur vel leo a tortor ornare euismod quis vitae elit."/>    
    </>
  )
}

export default ProjectVacancies
