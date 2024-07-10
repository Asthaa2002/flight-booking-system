import express from "express";

import { createUser, updateProfile } from "../controllers/user.js"
import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"uploads");
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
});
const upload = multer({storage:storage});


const router = express.Router();
router.post("/createUser",createUser);
router.put('/user/profile/:userId', upload.single('file'), updateProfile)


export default router;