import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImg from '../Pictures/staticBackground.png';
import { auth, db } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const VerifiedLogin = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, mail, password);
      const user = userCredential.user;

      // Optional: Fetch extra data from Firestore
      const userDoc = await getDoc(doc(db, 'usersVerified', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('Logged in user data:', userData);
      }

      console.log('Login successful');
      navigate('/');
    } catch (err) {
      setError('Login failed: ' + err.message);
      console.error(err);
    }
  };
  return (
    <div
  className="min-h-screen flex flex-col items-center justify-center bg-fixed bg-contain bg-center bg-no-repeat px-4 md:px-16 py-10 bg-[#F7F4E9]"
  style={{
    backgroundImage: `url(${backgroundImg})`,
    backgroundRepeat: 'repeat',
    backgroundSize: '35%',
  }}
>
  {/* Heading */}
  <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f1a2c] mb-10">
    Verified Login
  </h1>

  {/* Login Box */}
  <div className="bg-[#29C9D3] p-12 rounded-[80px] shadow-2xl w-full max-w-4xl text-black">
    <form onSubmit={handleLogin} className="space-y-10">

      {/* College Mail */}
      <div className="flex items-center gap-6">
        <label className="w-[200px] text-lg font-bold">College Mail</label>
        <input
          type="text"
          className="flex-grow border-b-2 border-black bg-transparent focus:outline-none text-lg"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
        />
      </div>

      {/* Password */}
      <div className="flex items-center gap-6">
        <label className="w-[200px] text-lg font-bold">Password</label>
        <input
          type="password"
          className="flex-grow border-b-2 border-black bg-transparent focus:outline-none text-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center gap-6 mt-6 flex-wrap">
        <Link
          to="/verifiedCreate"
          className="bg-[#F7F4E9] text-black font-bold py-3 px-7 rounded-[20px] shadow hover:brightness-95 transition border-[3px] border-black"
        >
          Sign Up
        </Link>
        <Link
          to="/anonymousLogin"
          className="bg-[#F7F4E9] text-black font-bold py-3 px-7 rounded-[20px] shadow hover:brightness-95 transition border-[3px] border-black"
        >
          Anonymous Login
        </Link>
        <button
          type="submit"
          className="bg-[#FF6A3D] text-black font-bold py-3 px-7 rounded-[20px] shadow hover:bg-orange-600 transition border-[3px] border-black"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default VerifiedLogin;
