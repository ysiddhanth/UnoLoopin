import React from 'react'
import { Link } from 'react-router-dom'
import anonymousChatImg from '../Pictures/AnonymousChat.png';
import TopicBox from './TopicBox.jsx'

const AnonymousChat = () => {
  return (
    <>
    <TopicBox Name = "Anonymous Chat" Heading = "Connect. Converse. Contribute. Anonymously." buttonLink = "/generalAnonymous" loginLink = "/anonymousLogin" buttonText = "JOIN CHAT" bgImg = {anonymousChatImg} Content = "            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lacus lacus, porta eget velit eget, gravida consequat mauris. Nam tincidunt justo in felis faucibus, sit amet accumsan neque mollis. Integer eu leo ut sapien ullamcorper placerat et eu neque. Curabitur vel leo a tortor ornare euismod quis vitae elit."/>    
    </>
  )
}

export default AnonymousChat
