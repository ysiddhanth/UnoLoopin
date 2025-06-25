import React, { useEffect, useState } from 'react'
import Post from './Post'
import { db, auth } from '../../firebase'
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const cardColors = [
  'bg-[#DDEEFF]',
  'bg-[#C3F6FF]',
  'bg-[#FFFAC3]',
  'bg-[#FADADD]',
  'bg-[#E2F0CB]',
  'bg-[#FCD5CE]',
  'bg-[#D0E8F2]',
  'bg-[#FFF5E1]'
]

const Posts = ({ showNewPost, setShowNewPost }) => {
  const [posts, setPosts] = useState([])
  const [newTopic, setNewTopic] = useState('')
  const [username, setUsername] = useState('anonymous')

  // Fetch username from usersVerified
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'usersVerified', user.uid))
          if (userDoc.exists()) {
            setUsername(userDoc.data().username || 'anonymous')
          }
        } catch (err) {
          console.error('Error fetching username:', err)
        }
      } else {
        setUsername('anonymous')
      }
    })

    return () => unsubscribe()
  }, [])

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'posts'))
        const postList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setPosts(postList.sort((a, b) => b.time?.seconds - a.time?.seconds))
      } catch (err) {
        console.error('Error fetching posts:', err)
      }
    }

    fetchPosts()
  }, [showNewPost])

  // Handle creating a new post
  const handleCreatePost = async () => {
    if (!newTopic.trim()) return

    const newPost = {
      topic: newTopic.trim(),
      username,
      time: serverTimestamp(),
      likes: 0
    }

    try {
      await addDoc(collection(db, 'posts'), newPost)
      setNewTopic('')
      setShowNewPost(false)
    } catch (error) {
      console.error('Error adding post:', error)
    }
  }

  return (
    <div className="relative h-full overflow-y-auto px-6 py-10 bg-[#0F172A] text-black">
      {/* New Post Modal */}
      {showNewPost && (
        <div className="absolute top-0 left-0 w-full z-20 px-4 py-6">
          <div className="bg-white border border-gray-300 shadow-2xl rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Create a new post</h3>
            <textarea
              rows="4"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full border border-gray-300 rounded-lg p-3 mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setNewTopic('')
                  setShowNewPost(false)
                }}
                className="text-sm px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="text-sm px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post Grid */}
      <div
        className={`grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 transition ${
          showNewPost ? 'blur-sm pointer-events-none opacity-30' : ''
        }`}
      >
        {posts.map((post, index) => (
          <Post
            key={post.id}
            id={post.id} // ✅ required for Firestore updates
            topic={post.topic}
            username={post.username}
            time={post.time?.toDate().toLocaleString() ?? 'Just now'}
            likes={post.likes ?? 0}
            comments={post.comments?.length ?? 0}
            bgColor={cardColors[index % cardColors.length]}
          />


        ))}
      </div>
    </div>
  )
}

export default Posts
