import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import backgroundImg from '../Pictures/staticBackground.png';
import { auth, db } from '../../firebase.js';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const AnonymousCreate = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      setPassword('');
      setConfirmPassword('');
      return;
    }

    const fabricatedEmail = `${username}@lambda.com`;

    try {
      setError('');
      const userCredential = await createUserWithEmailAndPassword(auth, fabricatedEmail, password);
      const user = userCredential.user;

      await setDoc(doc(db, "usersVerified", user.uid), {
        username,
        email: fabricatedEmail,
        createdAt: new Date().toISOString()
      });

      console.log('Anonymous account created');
      navigate('/');
    } catch (err) {
      setError(err.message);
      console.error("Firebase Error:", err);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F7F4E9] bg-fixed bg-center bg-no-repeat px-4 md:px-16 py-10"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '35%',
      }}
    >
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f1a2c] mb-10 flex items-center gap-2">
        <CheckCircle className="w-8 h-8 text-orange-600" />
        Anonymous Account Creation
      </h1>

      {/* Form Box */}
      <div className="bg-[#29C9D3] p-12 rounded-[80px] shadow-2xl w-full max-w-4xl text-black">
        <form onSubmit={handleCreate} className="space-y-10">

          {/* Username */}
          <div className="flex items-center gap-6">
            <label className="w-[200px] text-lg font-bold">Create Username</label>
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
            <label className="w-[200px] text-lg font-bold">Create Password</label>
            <input
              type="password"
              className="flex-grow border-b-2 border-black bg-transparent focus:outline-none text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center gap-6">
            <label className="w-[200px] text-lg font-bold">Confirm Password</label>
            <input
              type="password"
              className="flex-grow border-b-2 border-black bg-transparent focus:outline-none text-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-3 px-6 rounded-[20px] shadow hover:bg-orange-600 transition border-[3px] border-black"
          >
            Create Anonymous Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnonymousCreate;
