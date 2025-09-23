import React, { useState } from 'react'
import { assets } from '../../assets/asset'
import AddCarModal from '../addCarModal/addCarModal'
import './footer.css'

const Footer = ({ editCar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="footer">
      {/* hide Add button while editing */}
      {!editCar && (
        <button className="add-btn" onClick={() => setIsModalOpen(true)}>
          <img src={assets.add} alt="Add" />
        </button>
      )}

      {isModalOpen && (
        <AddCarModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}


export default Footer
