import React, { useContext } from "react";
import axios from "axios";
import "./editCarModal.css";
import { StoreContext } from "../../context/storeContext";

const EditCarModal = ({ car, onClose }) => {
  const { url, car_info, setCarInfo, token } = useContext(StoreContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedCar = {
      vehicle: e.target.vehicle.value,
      plate_number: e.target.plate_number.value,
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
      const res = await axios.post(
        `${url}/api/info/update`,
        { carId: car._id, updatedCar },
        { headers: { token } }
      );

      if (res.data.success) {
        setCarInfo(res.data.cars);
        onClose();
      }
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">Edit Vehicle Info</h2>

        <form className="car-form" onSubmit={handleSubmit}>
          <label>Vehicle Name</label>
          <input type="text" name="vehicle" defaultValue={car.vehicle} className="styled-input" />

          <label>Plate Number</label>
          <input type="text" name="plate_number" defaultValue={car.plate_number} className="styled-input" />

          <label>Engine Type</label>
          <input type="text" name="engine_type" defaultValue={car.engine_type} className="styled-input" />

          <label>Current Mileage</label>
          <input type="number" name="curr_Mil" defaultValue={car.curr_Mil} className="styled-input" />

          <label>Battery Date</label>
          <input type="text" name="batt_date" defaultValue={car.batt_date} className="styled-input" />

          <label>Previous Oil Change</label>
          <input type="text" name="prev_oil_change" defaultValue={car.prev_oil_change} className="styled-input" />

          <label>Next Oil Change</label>
          <input type="text" name="next_oil_change" defaultValue={car.next_oil_change} className="styled-input" />

          <label>Next Tire Replacement</label>
          <input type="text" name="next_tire_replacement" defaultValue={car.next_tire_replacement} className="styled-input" />

          <label>Next Brake Service</label>
          <input type="text" name="next_brake_service" defaultValue={car.next_brake_service} className="styled-input" />

          <label>Next Coolant Change</label>
          <input type="text" name="next_coolant_change" defaultValue={car.next_coolant_change} className="styled-input" />

          <label>Next Transmission Service</label>
          <input type="text" name="next_transmission_service" defaultValue={car.next_transmission_service} className="styled-input" />

          <label>Next General Checkup</label>
          <input type="text" name="next_general_checkup" defaultValue={car.next_general_checkup} className="styled-input" />

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCarModal;
