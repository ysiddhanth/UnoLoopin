// src/Components/HomePage/Footer.jsx
import React from 'react';
import { Instagram, Globe, Paperclip, Mail } from 'lucide-react';
import FooterTeamCard from './FooterTeamCard'
import sid from '../../assets/siddhanth.jpeg' // adjust path if needed
import kedar from '../../assets/kedar.jpeg' // adjust path if needed
import shreya from '../../assets/shreya.jpeg' // adjust path if needed

const Footer = () => {
  return (
    <footer className="w-full mt-20 bg-[#18223B] items-center gap-6 rounded-t-[50px] py-20 px-8 text-white flex flex-col items-center">
      <h2 className="text-[60px] font-black">Creators</h2>

      <h2 className="text-2xl font-bold mb-6 text-center">Meet the Team</h2>
        <FooterTeamCard
          name="Janjanam Kedarananda"
          photo=  {kedar}
          email="ee24btech11030@iith.ac.in"
          instagram="_kkedarr_"
          role="Frontend, Ideation"
        />
        <FooterTeamCard
          name="Shreya Sunilkumar"
          photo={shreya}
          email="bd24bdes11001@iith.ac.in"
          instagram="batartawada"
          role="Designer"
        />
        <FooterTeamCard
          name="Siddhanth Yellanki"
          photo={sid}
          email="ee24btech11059@iith.ac.in"
          instagram="truly.siddu"
          role="Frontend, FireBase"
        />
        {/* Repeat <FooterTeamCard /> for more team members */}

      <div className="flex gap-6 mt-4 text-white">
        <p className="text-sm">Copyrights reserved 2025</p>
        <Instagram className="w-5 h-5" />
        <Globe className="w-5 h-5" />
        <Paperclip className="w-5 h-5" />
      </div>
    </footer>
  );
};

export default Footer;
