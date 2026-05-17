import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import Feed from './pages/feed'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Feed />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/create-post' element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
