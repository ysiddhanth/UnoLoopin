import React from 'react';
import { Link } from 'react-router-dom';
import resourcesImg from '../Pictures/Resources.png';
import TopicBox from './TopicBox.jsx'
const Resources = () => {
  return (
    <>
    <TopicBox Name = "Resources" Heading = "Fuel for the curious" buttonLink = "/courseReview" loginLink = "\verifiedLogin" buttonText = "Explore" bgImg = {resourcesImg} Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lacus lacus, porta eget velit eget, gravida consequat mauris. Nam tincidunt justo in felis faucibus, sit amet accumsan neque mollis. Integer eu leo ut sapien ullamcorper placerat et eu neque. Curabitur vel leo a tortor ornare euismod quis vitae elit."/>    
    </>
  );
};

export default Resources;
