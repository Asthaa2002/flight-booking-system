import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
   userId:{
    type: mongoose.Schema .Types.ObjectId,
    ref: "User"

   },
   flightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight"
   },
   date: {
    type:Date,
    default: Date.now
   }
})

export default mongoose.model("booking",bookingSchema)