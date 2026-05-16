import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CreatePost from './pages/CreatePost'
import Feed from './pages/feed'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Feed />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/create-post' element={<CreatePost />} />
      </Routes>
    </Router>
  )
}

export default App 