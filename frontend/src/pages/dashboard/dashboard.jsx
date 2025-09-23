import React, { useState } from 'react'
import './dashboard.css'
import Header from '../../components/header/header'
import InfoDisplay from '../../components/infoDisplay/infoDisplay'
import Footer from '../../components/footer/footer'

const Dashboard = () => {
  const [editCar, setEditCar] = useState(null)  // ✅ lifted state

  return (
    <div className="dashboard">
      <Header />
      <InfoDisplay editCar={editCar} setEditCar={setEditCar} /> {/* pass down */}
      <Footer editCar={editCar} /> {/* pass editCar */}
    </div>
  )
}

export default Dashboard
