import React, { useState, useEffect } from 'react'
import Sidebar from './components/sidebar/sidebar'
import { Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from './pages/dashboard/dashboard'
import Notification from './pages/notification/notification'
import TollCal from './pages/tollCal/tollCal'
import Login from './components/login/login'


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // ✅ check token on page load (so refresh stays logged in if token exists)
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <>
      {!isLoggedIn ? (
        // Show Login/Sign Up first
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        // Show the app only after login
        <div className="app">
          <Sidebar setIsLoggedIn={setIsLoggedIn} /> {/* pass down setter */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/tollCal" element={<TollCal />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      )}
    </>
  )
}

export default App
