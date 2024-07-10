import mongoose from "mongoose"


const FlightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  airline: { type: String, required: true },
  date: { type: Date, required: true },
  departure: {
    airport: { type: String, required: true },
    city: { type: String, required: true },
    time: { type: Date, required: true }
  },
  arrival: {
    airport: { type: String, required: true },
    city: { type: String, required: true },
    time: { type: Date, required: true }
  },
  status: { type: String, required: true }
});

export default  mongoose.model('Flight', FlightSchema);
