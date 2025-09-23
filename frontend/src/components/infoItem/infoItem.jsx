import React from 'react'
import './infoItem.css'
import { assets } from '../../assets/asset'

const InfoItem = ({ car, onClick, onDelete, onEdit }) => {
  return (
    <div className="car-info">
      <span className="car-name" onClick={onClick}>
        {car.vehicle}
      </span>
      <div className="car-actions">
        <img
          src={assets.edit}
          alt="Edit"
          className="icon"
          onClick={(e) => {
            e.stopPropagation()
            onEdit(car)   // ✅ calls parent’s setEditCar(item)
          }}
        />

        <img
          src={assets.del}
          alt="Delete"
          className="icon"
          onClick={(e) => {
            e.stopPropagation()
            onDelete(car._id)   // ✅ Pass _id to InfoDisplay
          }}
        />
      </div>
    </div>
  )
}

export default InfoItem
