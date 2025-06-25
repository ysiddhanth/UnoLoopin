import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const TopicBox = (props) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      navigate(props.buttonLink);
    } else {
      navigate(props.loginLink);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-11">
      <div
        className="relative text-[#F7F4E9] rounded-[106px] shadow-2xl px-16 py-14 min-w-[1200px] min-h-[539px]"
        style={{
          backgroundImage: `url(${props.bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Heading */}
        <h1 className="text-5xl font-black mb-4">{props.Name}</h1>
        <p className="text-2xl font-black mb-10">
          {props.Heading}
        </p>

        {/* Inner white box with black border */}
        <div className="bg-[#F7F4E9] text-black rounded-[35px] p-6 w-full max-w-3xl">
          <p className="text-base leading-relaxed">
            {props.Content}
          </p>
        </div>

        {/* EXPLORE Button */}
        <button
          onClick={handleButtonClick}
          className="absolute bottom-10 right-10 bg-[#F7F4E9] text-2xl text-black font-extrabold px-8 py-4 rounded-[26px] border-4 border-black hover:bg-gray-200 transition"
        >
          {props.buttonText}
        </button>
      </div>
    </section>
  );
};

export default TopicBox;
