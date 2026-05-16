import React from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { getApiUrl } from '../config/api'

const CreatePost = () => {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    axios.post(`${getApiUrl()}/posts`, formData)
      .then(() => {
        alert("Post created ")
        navigate('/feed')
      })
      .catch((err) => {
        console.log(err)
        alert("Error creating post")
      })
  }

  return (
    <>
      <nav className='top-nav'>
        <Link to="/feed" className='nav-link'>Feed</Link>
        <Link to="/create-post" className='nav-link active'>Create</Link>
      </nav>

      <section className='create-post-section'>
        <div className='create-post-card'>
          <h1>Create Post</h1>
          <p>Upload image + caption</p>

          <form onSubmit={handleSubmit}>
            <input type='file' name='image' accept='image/*' required />
            <input type='text' name='caption' placeholder='Write caption...' required />
            <button type='submit'>Post</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default CreatePost
