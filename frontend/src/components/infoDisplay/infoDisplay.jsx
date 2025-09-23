import React, { useContext, useState } from 'react'
import './infoDisplay.css'
import { StoreContext } from '../../context/storeContext'
import InfoItem from '../infoItem/infoItem'
import InfoModal from '../infoModal/infoModal'
import EditCarModal from '../editCarModal/editCarModal'
import axios from "axios"

const InfoDisplay = ({ editCar, setEditCar }) => {
  const { car_info, setCarInfo, url, token } = useContext(StoreContext)
  const [selectedCar, setSelectedCar] = useState(null)

  // ✅ Delete function
  const handleDelete = async (carId) => {
    try {
      const res = await axios.post(
        `${url}/api/info/remove`,
        { carId },
        { headers: { token } }
      )

      if (res.data.success) {
        setCarInfo(car_info.filter((c) => c._id !== carId))
      } else {
        console.error("❌ Delete failed:", res.data.message)
      }
    } catch (err) {
      console.error("❌ Error deleting car:", err)
    }
  }

  return (
    <div className='info-display' id='info-display'>
      {/* 🚗 List all cars */}
      {car_info.map((item) => (
        <InfoItem
          key={item._id}
          car={item}
          onClick={() => setSelectedCar(item)}   // open view modal
          onDelete={handleDelete}                // delete
          onEdit={() => setEditCar(item)}        // open edit modal
        />
      ))}

      {/* 👀 View modal */}
      {selectedCar && (
        <InfoModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}

      {/* ✏️ Edit modal */}
      {editCar && (
        <EditCarModal car={editCar} onClose={() => setEditCar(null)} />
      )}
    </div>
  )
}

export default InfoDisplay
