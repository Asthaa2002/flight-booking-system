import express from "express";

import { createUser } from "../controllers/user.js"


const router = express.Router();
router.post("/createUser",createUser);

export default router;