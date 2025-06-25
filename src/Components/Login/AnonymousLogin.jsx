import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImg from '../Pictures/staticBackground.png';
import { auth, db } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AnonymousLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const fabricatedEmail = `${username}@lambda.com`;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, fabricatedEmail, password);
      const user = userCredential.user;

      // Store in Firestore (optional: only once or update if needed)
      const userRef = doc(db, 'usersVerified', user.uid);
      await setDoc(userRef, { username }, { merge: true });

      console.log('Anonymous login successful');
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
        Anonymous Login
      </h1>

      {/* Login Box */}
      <div className="bg-[#29C9D3] p-12 rounded-[80px] shadow-2xl w-full max-w-4xl text-black">
        <form onSubmit={handleLogin} className="space-y-10">

          {/* Username */}
          <div className="flex items-center gap-6">
            <label className="w-[200px] text-lg font-bold">Username</label>
            <input
              type="text"
              className="flex-grow border-b-2 border-black bg-transparent focus:outline-none text-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              to="/anonymousCreate"
              className="bg-[#F7F4E9] text-black font-bold py-3 px-7 rounded-[20px] shadow hover:brightness-95 transition border-[3px] border-black"
            >
              Sign Up
            </Link>
            <Link
              to="/verifiedLogin"
              className="bg-[#F7F4E9] text-black font-bold py-3 px-7 rounded-[20px] shadow hover:brightness-95 transition border-[3px] border-black"
            >
              Verified Login
            </Link>
            <button
              type="submit"
              className="bg-[#FF6A3D] text-black font-bold py-3 px-7 rounded-[20px] shadow hover:bg-orange-600 transition border-[3px] border-black"
            >
              Login
            </button>
          </div>
        </form>

        {error && (
          <p className="text-red-600 font-semibold mt-4">{error}</p>
        )}
      </div>
    </div>
  );
};

export default AnonymousLogin;
