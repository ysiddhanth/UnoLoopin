import React, { useState, useEffect } from 'react'
import {
  Heart,
  HeartIcon,
  MessageCircle,
  Bookmark,
  BookmarkCheck
} from 'lucide-react'
import { db, auth } from '../../firebase'
import {
  doc,
  updateDoc,
  increment,
  addDoc,
  collection,
  onSnapshot
} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const Post = ({
  id,
  topic = '',
  username = 'anonymous',
  time = 'just now',
  likes: initialLikes = 0,
  comments: initialComments = 0,
  bgColor = 'bg-white'
}) => {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likes, setLikes] = useState(initialLikes)
  const [commentInput, setCommentInput] = useState('')
  const [comments, setComments] = useState(initialComments)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
    return () => unsubscribe()
  }, [])

  const toggleLike = async () => {
    const newLikedState = !liked
    setLiked(newLikedState)
    setLikes(prev => newLikedState ? prev + 1 : prev - 1)

    try {
      const postRef = doc(db, 'posts', id)
      await updateDoc(postRef, {
        likes: increment(newLikedState ? 1 : -1)
      })
    } catch (error) {
      console.error('Error updating like count:', error)
    }
  }

  const toggleSave = () => {
    setSaved(!saved)
    // Optional: You can add logic to store saved posts per user
  }
  const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`


  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!commentInput.trim()) return

    const commentData = {
      text: commentInput.trim(),
      createdAt: new Date(),
      username: currentUser?.displayName || currentUser?.email || 'anonymous'
    }

    try {
      await addDoc(collection(db, 'posts', id, 'comments'), commentData)
      setComments(prev => prev + 1)
      setCommentInput('')
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  const truncatedTopic =
    topic && topic.length > 150 ? topic.slice(0, 150) + '...' : topic

  return (
    <div
      className={`relative ${bgColor} rounded-[40px] p-5 shadow-md flex flex-col justify-between min-h-[180px] transition hover:shadow-xl`}
    >
      <div className="absolute top-3 right-4 text-xs text-gray-600">{time}</div>

      <div className="flex items-center gap-2 mb-2">
        <span className="w-3 h-3 rounded-full" style = {{backgroundColor: randomColor}}/>
        <span className="text-sm font-semibold italic text-gray-800">@{username}</span>
      </div>

      <div className="flex-1 mb-4">
        <p className="text-[15px] font-semibold text-gray-900 leading-snug">{truncatedTopic}</p>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-800 mt-auto">
        <div className="flex items-center gap-5">
          <button
            onClick={toggleLike}
            className="flex items-center gap-1 hover:text-red-500 transition"
          >
            {liked ? (
              <HeartIcon className="w-5 h-5 text-red-500" fill="currentColor" />
            ) : (
              <Heart className="w-5 h-5" />
            )}
            <span>{likes}</span>
          </button>

          <div className="flex items-center gap-1">
            <MessageCircle className="w-5 h-5" />
            <span>{comments}</span>
          </div>
        </div>

        <button onClick={toggleSave} className="hover:text-blue-600 transition">
          {saved ? (
            <BookmarkCheck className="w-5 h-5 text-blue-600" />
          ) : (
            <Bookmark className="w-5 h-5" />
          )}
        </button>
      </div>

      <form onSubmit={handleCommentSubmit} className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-white/60 rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />
        <button
          type="submit"
          className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition"
        >
          Post
        </button>
      </form>
    </div>
  )
}

export default Post
