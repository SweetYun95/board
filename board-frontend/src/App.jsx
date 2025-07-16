import './App.css'
import './styles/common.css'

import Navbar from './components/shared/Navbar'
import Home from './pages/Home'
import LoginPage from './pages//LoginPage'
import Signup from './pages/SignupPage'

import { Route, Routes } from 'react-router-dom'
import { checkAuthStatusThunk } from './features/authSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

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
         </Routes>
      </>
   )
}

export default App
