import React, { useContext, useState } from 'react'
import './sidebar.css'
import { assets } from '../../assets/asset'
import { StoreContext } from '../../context/storeContext'
import { useNavigate } from 'react-router-dom' 


const Sidebar = ({ setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false)
  const {setToken} = useContext(StoreContext)
  const navigate = useNavigate()
  const logout = ()=>{
    localStorage.removeItem("token");
    setToken("");
    setIsLoggedIn(false)   // ✅ tell App to show login screen
    navigate("/")
  }

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Show burger only if navbar is closed */}
      {!isOpen && (
        <div className="burger" onClick={toggleNavbar}>
         <img src={assets.nav} alt="" />
        </div>
      )}

      {/* Sidebar Menu */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleNavbar}>
          ✕
        </button>
        <ul className="sidebar-menu">
          <li>
            About <img src={assets.externalLink_icon} alt="external link" />
          </li>
          <li>
            Guides <img src={assets.externalLink_icon} alt="external link" />
          </li>
          <li>Notification</li>
          <li>Toll calculator</li>
          <li>Dashboard</li>
          <li onClick={logout}>Logout</li>
        </ul>

         {/* Bottom icons */}
        <div className="sidebar-icons">
          
          {/* Add Discord, Telegram, etc. icons here */}
        </div>
      </div>
    </>
  )
}

export default Sidebar
