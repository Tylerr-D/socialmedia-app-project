import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getApiUrl } from '../config/api'

const Feed = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/posts`)
      .then((res) => {
        setPosts(res.data.posts || [])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <nav className='top-nav'>
        <Link to="/feed" className='nav-link active'>Feed</Link>
        <Link to="/create-post" className='nav-link'>Create</Link>
      </nav>

      <section className='feed-section'>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className='post-card'>
              <img src={post.image} alt={post.caption} />
              <p>{post.caption}</p>
            </div>
          ))
        ) : (
          <h1>No posts yet 😢</h1>
        )}
      </section>
    </>
  )
}

export default Feed
