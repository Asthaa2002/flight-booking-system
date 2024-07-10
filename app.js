import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

import userRoutes from "./routes/user.js";
import flightRoutes from "./routes/flightData.js";
import bookingRoutes from "./routes/booking.js"

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;
const { MONGOD_URI } = process.env;


app.set("view engine", "ejs");
app.set("views", "views");



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());


app.use(userRoutes);
app.use(flightRoutes);
app.use(bookingRoutes);


mongoose.connect(MONGOD_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error)
