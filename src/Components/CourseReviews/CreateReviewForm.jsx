import React, { useState, useEffect } from 'react'
import { addDoc, collection, serverTimestamp, doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'

const CreateReviewForm = ({ onClose }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [username, setUsername] = useState('anonymous')

  // Fetch current user's username if available
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const docRef = doc(db, 'usersVerified', user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setUsername(docSnap.data().username || 'anonymous')
        }
      }
    })
    return () => unsubscribe()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    const newReview = {
      username,
      title,
      content,
      likes: 0,
      comments: [],
      time: serverTimestamp()
    }

    try {
      await addDoc(collection(db, 'courseReviews'), newReview)
      onClose()
    } catch (error) {
      console.error('Error creating review:', error)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-xl shadow-2xl text-black">
        <h2 className="text-xl font-bold mb-4">Create Course Review</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title of the course or review"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Write your review..."
            rows={5}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateReviewForm
