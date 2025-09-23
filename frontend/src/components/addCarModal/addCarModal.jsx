import React, { useContext } from "react";
import axios from "axios";
import "./addCarModal.css";
import { StoreContext } from "../../context/storeContext";

const AddCarModal = ({ onClose }) => {
  const { url, car_info, setCarInfo } = useContext(StoreContext); // ✅ use context

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCar = {
      _id: Date.now().toString(),
      vehicle: e.target.vehicle.value,
      plate_number: e.target.plate_number.value,
      orCr_Exp: e.target.orCr_Exp.value,
      engine_type: e.target.engine_type.value,
      curr_Mil: e.target.curr_Mil.value,
      batt_date: e.target.batt_date.value,
      prev_oil_change: e.target.prev_oil_change.value,
      next_oil_change: e.target.next_oil_change.value,
      next_tire_replacement: e.target.next_tire_replacement.value,
      next_brake_service: e.target.next_brake_service.value,
      next_coolant_change: e.target.next_coolant_change.value,
      next_transmission_service: e.target.next_transmission_service.value,
      next_general_checkup: e.target.next_general_checkup.value,
    };

    try {
      // ✅ Save to backend (still works with localStorage token)
      await axios.post(
        `${url}/api/info/add`,
        { car: newCar },
        { headers: { token: localStorage.getItem("token") } }
      );

      // ✅ Update UI immediately
      setCarInfo([...car_info, newCar]);

      onClose();
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">Add Vehicle Info</h2>

        <form className="car-form" onSubmit={handleSubmit}>
          <label>Vehicle Name</label>
          <input type="text" name="vehicle" placeholder="Ex: Toyota Vios" className="styled-input" />

          <label>Plate Number</label>
          <input type="text" name="plate_number" placeholder="ABC-1234" className="styled-input" />

          <label>OR/CR Expiration</label>
          <input type="text" name="orCr_Exp" placeholder="MM/DD/YYYY" className="styled-input" />

          <label>Engine Type</label>
          <input type="text" name="engine_type" placeholder="Gas / Diesel" className="styled-input" />

          <label>Current Mileage</label>
          <input type="number" name="curr_Mil" placeholder="e.g. 25000 km" className="styled-input" />

          <label>Battery Date</label>
          <input type="text" name="batt_date" placeholder="MM/DD/YYYY" className="styled-input" />

          <label>Previous Oil Change</label>
          <input type="text" name="prev_oil_change" placeholder="MM/DD/YYYY" className="styled-input" />

          <label>Next Oil Change</label>
          <input type="text" name="next_oil_change" placeholder="MM/DD/YYYY" className="styled-input" />

          <label>Next Tire Replacement</label>
          <input type="text" name="next_tire_replacement" placeholder="MM/DD/YYYY" className="styled-input" />

          <label>Next Brake Service</label>
          <input type="text" name="next_brake_service" placeholder="MM/DD/YYYY" className="styled-input" />

          <label>Next Coolant Change</label>
          <input type="text" name="next_coolant_change" placeholder="MM/DD/YYYY" className="styled-input" />

          <label>Next Transmission Service</label>
          <input type="text" name="next_transmission_service" placeholder="MM/DD/YYYY" className="styled-input" />

          <label>Next General Checkup</label>
          <input type="text" name="next_general_checkup" placeholder="MM/DD/YYYY" className="styled-input" />

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarModal;
