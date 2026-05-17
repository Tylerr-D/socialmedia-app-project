import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import API_URL from '../config/api'

const CreatePost = () => {
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await axios.post(`${API_URL}/posts`, new FormData(e.target))
      alert('Post created!')
      navigate('/feed')
    } catch (err) {
      console.log("Error creating post:", err)
      alert('Failed to create post')
    }
  }

  return (
    <>
      <nav className='top-nav'>
        <Link to='/feed' className='nav-link'>Feed</Link>
        <Link to='/create-post' className='nav-link active'>Create</Link>
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