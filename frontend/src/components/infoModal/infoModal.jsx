import React from 'react'
import './infoModal.css'

const InfoModal = ({ car, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{car.vehicle}</h2>
        <p><strong>Plate:</strong> {car.plate_number}</p>
        <p><strong>Engine:</strong> {car.engine_type}</p>
        <p><strong>Current Mileage:</strong> {car.curr_Mil} km</p>
        <p><strong>Battery Date:</strong> {car.batt_date}</p>
        <p><strong>Previous Oil Change:</strong> {car.prev_oil_change}</p>
        <p><strong>Next Oil Change:</strong> {car.next_oil_change}</p>
        <p><strong>Next Tire Replacement:</strong> {car.next_tire_replacement}</p>
        <p><strong>Next Brake Service:</strong> {car.next_brake_service}</p>
        <p><strong>Next Coolant Change:</strong> {car.next_coolant_change}</p>
        <p><strong>Next Transmission Service:</strong> {car.next_transmission_service}</p>
        <p><strong>Next General Checkup:</strong> {car.next_general_checkup}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}


export default InfoModal
