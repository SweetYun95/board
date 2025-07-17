import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/shared/Navbar'
import Home from './pages/Home'
import LoginPage from './pages//LoginPage'
import Signup from './pages/SignupPage'
import PostPage from './pages/PostPage'
import PostForm from './components/post/PostForm'
import { checkAuthStatusThunk } from './features/authSlice'

import './App.css'
import './styles/common.css'

function App() {
   const dispatch = useDispatch()
   const { isAuthenticated, user } = useSelector((state) => state.auth)

   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])

   return (
      <>
         <Navbar isAuthenticated={isAuthenticated} user={user} />
         <Routes>
            <Route path="/" element={<Home isAuthenticated={isAuthenticated} user={user} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/posts/create" element={<PostForm />} />
         </Routes>
      </>
   )
}

export default App
