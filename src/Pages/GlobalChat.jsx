import React, { useEffect, useState, useRef } from 'react';
import { db, auth } from '../firebase.js';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  getDoc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { FaUserCircle } from 'react-icons/fa';
import { FiSend, FiImage } from 'react-icons/fi';



const GlobalChat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState('');
  const [autoScroll, setAutoScroll] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'usersVerified', user.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
        } else {
          setUsername('Anonymous');
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'globalChat'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Scroll to bottom if autoScroll is enabled
  useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, autoScroll]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isAtBottom = scrollHeight - scrollTop <= clientHeight + 100;
    setAutoScroll(isAtBottom);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (messageInput.trim() === '') return;

    await addDoc(collection(db, 'globalChat'), {
      username: username || 'Anonymous',
      message: messageInput.trim(),
      createdAt: serverTimestamp()
    });

    setMessageInput('');
  };

  return (
    <div className="min-h-screen bg-[#F7F4E9] text-extrabold relative overflow-hidden font-monseratt">
      {/* Background Text */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="w-full h-full flex flex-col space-y-4 animate-none">
          {Array.from({ length: 20 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-around w-full text-[90px] font-black text-[#F4DB7D] opacity-70 leading-none whitespace-nowrap"
              style={{ lineHeight: '100px' }}
            >
              {Array.from({ length: 5 }).map((_, colIndex) => (
                <span key={colIndex}>ANONYMOUSCHAT</span>
              ))}
            </div>
          ))}
        </div>
      </div>


      {/* Header */}
      <div className="z-10 relative p-8 flex justify-between items-center rounded-[35px] bg-[#F7F4E9]">
        <div>
          <h1 className="text-3xl font-extrabold text-[#FF5722] ">★ Global Chat</h1>
          <p className="text-sm text-[#FF5722] mt-1">Connect. Converse. Contribute. Anonymously.</p>
        </div>
        <div className="flex gap-4 text-xl">
          <button>🔄</button>
          <button>🏠</button>
          <button>🔔</button>
          <button>👤</button>
        </div>
      </div>

      {/* Chat Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="z-10 relative mx-auto max-w-4xl bg-[#FF6B3D] rounded-[81px] p-6 shadow-xl h-[80vh] overflow-y-auto flex flex-col gap-4 scroll-smooth"
      >
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start gap-3">
            <FaUserCircle className="text-4xl text-black bg-[#F7F4E9] p-1 rounded-full" />
            <div className="bg-[#F7F4E9] rounded-xl px-4 py-2 shadow-inner max-w-[70%]">
              <p className="text-sm font-bold">{msg.username}</p>
              <p className="text-md">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
<form
  onSubmit={handleSubmit}
  className="z-10 fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[95%] max-w-5xl bg-[#0A1D3E] text-white flex items-center rounded-full px-8 py-4 shadow-2xl"
>
  <FiImage className="text-2xl mr-4" />
  <input
    type="text"
    className="flex-grow bg-transparent outline-none placeholder-white text-lg"
    placeholder="Type your message..."
    value={messageInput}
    onChange={(e) => setMessageInput(e.target.value)}
  />
  <button type="submit">
    <FiSend className="text-2xl ml-4" />
  </button>
</form>

    </div>
  );
};

export default GlobalChat;
