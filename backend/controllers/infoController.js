import userModel from "../models/userModel.js";

// ADD car info
const addInfo = async (req, res) => {
    try {
        const { userId, car } = req.body;  
        // ⬆️ Instead of req.body.itemId, expect a "car" object from frontend

        let userData = await userModel.findById(userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // ⬇️ Push the new car object into the cars array
        userData.cars.push(car);
        await userData.save();

        res.json({ success: true, message: "Car info added", cars: userData.cars });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding car info" });
    }
};

// REMOVE car info
const removeInfo = async (req, res) => {
    try {
        const { userId, carId } = req.body;  
        // ⬆️ Expect carId from frontend (we’ll pass Date.now().toString())

        let userData = await userModel.findById(userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // ⬇️ Filter out the car with matching id
        userData.cars = userData.cars.filter(car => car._id !== carId);
        await userData.save();

        res.json({ success: true, message: "Car removed", cars: userData.cars });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing car info" });
    }
};

// GET all car info for a user
const getInfo = async (req, res) => {
    try {
        const { userId } = req.body;

        let userData = await userModel.findById(userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // ⬇️ Return full cars array
        res.json({ success: true, cars: userData.cars });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching car info" });
    }
};

// UPDATE car info
const updateInfo = async (req, res) => {
  try {
    const { userId, carId, updatedCar } = req.body;

    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Find car by _id and update
    const carIndex = userData.cars.findIndex(car => car._id === carId);
    if (carIndex === -1) {
      return res.json({ success: false, message: "Car not found" });
    }

    userData.cars[carIndex] = { ...userData.cars[carIndex], ...updatedCar };
    await userData.save();

    res.json({ success: true, message: "Car updated", cars: userData.cars });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating car info" });
  }
};

export { addInfo, removeInfo, getInfo, updateInfo };