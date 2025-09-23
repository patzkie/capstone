import express from "express";
import { addInfo, removeInfo, getInfo, updateInfo } from "../controllers/infoController.js";
import authMiddleware from "../middleware/auth.js";

const infoRouter = express.Router();

infoRouter.post("/add", authMiddleware, addInfo);       // body: { car }
infoRouter.post("/remove", authMiddleware, removeInfo); // body: { carId }
infoRouter.post("/get", authMiddleware, getInfo);       // body: {}
                                                        // userId injected by auth
infoRouter.post("/update", authMiddleware, updateInfo); // body: { carId, updatedCar }
export default infoRouter;
