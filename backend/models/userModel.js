import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // ⬇️ Changed from "infoData: { type:Object }" to "cars: { type:[Object] }"
    // This allows each user to store multiple car objects in an array
    cars: { type: [Object], default: [] }
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
