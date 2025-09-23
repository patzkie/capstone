import mongoose from "mongoose";

 export const connectDB = async ()=> {
    await mongoose.connect('mongodb+srv://aboymarjorie19_db_user:marjorieaboy18@cluster0.vqvvvqn.mongodb.net/capstone').then(()=> console.log("Db Connected"));
}