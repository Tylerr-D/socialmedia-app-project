import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import API_URL from '../config/api'

const Feed = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    try {
      const res = await axios.get(`${API_URL}/posts`)
      setPosts(res.data.posts)
    } catch (err) {
      console.log("Error fetching posts:", err)
    }
  }

  return (
    <>
      <nav className='top-nav'>
        <Link to='/feed' className='nav-link active'>Feed</Link>
        <Link to='/create-post' className='nav-link'>Create</Link>
      </nav>

      <section className='feed-section'>
        {posts.length === 0 && <h1>No posts yet</h1>}

        {posts.map((post) => (
          <div key={post._id} className='post-card'>
            <img src={post.image} alt={post.caption} />
            <p>{post.caption}</p>
          </div>
        ))}
      </section>
    </>
  )
}

export default Feed