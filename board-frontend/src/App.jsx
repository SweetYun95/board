import './App.css'
import './styles/common.css'

import Navbar from './components/shared/Navbar'
import Home from './pages/Home'
import Signup from ''

import { Route, Routes } from 'react-router-dom'

function App() {
   return (
      <>
         <Navbar />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
         </Routes>
      </>
   )
}

export default App
