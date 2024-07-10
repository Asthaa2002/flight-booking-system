import express from "express";
import { flightData } from "../controllers/flightData.js"



const router = express.Router();

router.post("/flight/data",flightData);
export default router;