import React, { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import ReviewCard from '../Components/CourseReviews/CourseReviewCard'
import ReviewSearch from '../Components/CourseReviews/CourseSearch'
import plus from '../Components/Pictures/plus.png'
import CreateReviewForm from '../Components/CourseReviews/CreateReviewForm'

const CourseReviews = () => {
  const [reviews, setReviews] = useState([])
  const [filteredReviews, setFilteredReviews] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)

  const fetchReviews = async () => {
    try {
      const q = query(collection(db, 'courseReviews'), orderBy('time', 'desc'))
      const snapshot = await getDocs(q)
      const reviewList = snapshot.docs.map(doc => {
        const data = doc.data()
        let formattedTime = ''
      
        try {
          formattedTime = data.time.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        } catch (err) {
          console.warn('Invalid time format for document:', doc.id, data.time)
          formattedTime = 'N/A'
        }
      
        return {
          id: doc.id,
          username: data.username || 'anonymous',
          time: formattedTime,
          title: data.title || '',
          content: data.content || '',
          likes: data.likes || 0,
          comments: data.comments || []
        }
      })
      
      setReviews(reviewList)
      console.log("Raw snapshot docs:", snapshot.docs.map(d => d.data()))

      setFilteredReviews(reviewList)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredReviews(reviews)
    } else {
      const term = searchTerm.toLowerCase()
      const filtered = reviews.filter(r =>
        r.title.toLowerCase().includes(term) ||
        r.username.toLowerCase().includes(term) ||
        r.content.toLowerCase().includes(term)
      )
      setFilteredReviews(filtered)
    }
  }, [searchTerm, reviews])

  return (
    <div className="min-h-screen bg-[#3CBCC3] py-6 px-6 text-white relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[40px] text-black font-extrabold">Course Reviews</h1>
        <button
          className="bg-yellow-400 px-4 py-2 rounded-lg text-black font-semibold"
          onClick={fetchReviews}
        >
          Refresh
        </button>
      </div>

      <ReviewSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="mt-8 flex flex-col gap-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map(review => (
            <ReviewCard
              key={review.id}
              username={review.username}
              time={review.time}
              title={review.title}
              content={review.content}
              likes={review.likes}
              comments={review.comments}
            />
          ))
        ) : (
          <div className="text-center text-gray-300 mt-12 text-lg">No matching reviews found.</div>
        )}
      </div>

      {/* Create Review Overlay */}
      {showForm && <CreateReviewForm onClose={() => setShowForm(false)} />}

      {/* Add Yours Button */}
      <button
  onClick={() => setShowForm(true)}
  className="fixed bottom-8 right-8 bg-[#18223B] text-white rounded-[30px] px-20 py-6 text-2xl font-bold shadow-2xl hover:bg-[#1e3d42] transition duration-200 flex items-center gap-4"
>
  Add Yours
  <img src={plus} alt="Add" className="w-7 h-7" />
</button>


    </div>
  )
}

export default CourseReviews
