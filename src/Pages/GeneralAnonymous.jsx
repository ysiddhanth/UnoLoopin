import React, { useState } from 'react'
import AnonymousTags from '../Components/AnonymousPage/AnonymousTags.jsx'
import Posts from '../Components/AnonymousPage/Posts.jsx'

const GeneralAnonymous = () => {
    const [showNewPost, setShowNewPost] = useState(false)
    return (
        <div className="h-screen overflow-hidden bg-[#0F172A] flex items-start gap-6 px-6 py-0">
        
        {/* Left: Anonymous Tags */}
        <div className="bg-[#FF6B3D] rounded-t-[81px] p-6 text-white mt-20 ml-4 flex-shrink-0 shadow-2xl h-[calc(100vh-2rem)]">
            <AnonymousTags onNewPostClick={() => setShowNewPost(true)} />

        </div>

        {/* Right: Scrollable Posts */}
        <div className="flex-1 h-screen overflow-y-scroll pr-4 pt-8 mt-4">
            <Posts showNewPost={showNewPost} setShowNewPost={setShowNewPost} />
        </div>
        </div>
    )
}

export default GeneralAnonymous
