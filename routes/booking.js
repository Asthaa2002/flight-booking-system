import express from "express"
import { bookFlight, searchflights } from "../controllers/flightBooking.js"


const router = express.Router()
router.get("/search/flight",searchflights)
router.post("/create/booking/:flightId",bookFlight)

export default router;