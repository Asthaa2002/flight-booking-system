import flightModel from "../models/flightModel.js";
import userModel from "../models/user.js";
import bookingModel from "../models/booking.js";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
dotenv.config({ path: "config/.env" });
import pdf from "html-pdf";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date);
};

export const searchflights = async (req, res) => {
    try {
        const { departure, arrival, date, airline } = req.query;

        const query = {};
        if (departure) query.departure = departure;
        if (arrival) query.arrival = arrival;
        if (date) {
            if (isValidDate(date)) {
                query.date = new Date(date);
            } else {
                return res.status(400).json({ message: "Invalid date format" });
            }
        }
        if (airline) query.airline = airline;

        const searchedFlights = await flightModel.find(query);
        return res.status(200).json({ message: "Flights searched successfully!", searchedFlights });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error!" });
    }
};


export const bookFlight = async(req,res)=> {
    try{
    const {flightId} = req.params;
    const flight = await flightModel.findById(flightId);
    if(!flight){
        return res.status(400).json({message: "Flight not found!"})
    }
    const{userId} = req.body;
    const user = await userModel.findById(userId)
    if(!user){
        return res.status(400).json({message: "user not found!"})
    }
    const booking = new bookingModel({
        user:userId,
        flight:flightId
    })
    const result = await booking.save();

    const html = await ejs.renderFile(
      path.join(__dirname, '../views/booking.ejs'), 
      { user, flight }
  );
    // Convert HTML to PDF
    pdf.create(html).toBuffer((err, buffer) => {
      if (err) {
        return res.status(500).json({ message: "Error generating PDF." });
      }

      // Configure Nodemailer
      const transporter = nodemailer.createTransport({
        service: 'Gmail', // or another email service
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
        }
      });

      // Send email with PDF attachment
      const mailOptions = {
        from: `your name <${process.env.GMAIL_USER}>`,
        to: user.email,
        subject: 'Booking Confirmation',
        text: 'Please find your booking confirmation attached.',
        attachments: [
          {
            filename: 'booking.pdf',
            content: buffer
          }
        ]
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: "Error sending email." });
        }
        return res.status(200).json({ message: "Booking created and email sent successfully!", result });
      });
    });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal server error"})
    }
}