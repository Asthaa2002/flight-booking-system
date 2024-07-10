import userModel from "../models/user.js";
import cloudinary from "../utils/helperFunction.js"

export const createUser = async(req,res) => {
    try{
const {name,email}= req.body;
if(!name || !email){
    return res.status(400).json({message: "please fill necessary details!!"})
}
const newUser =  new userModel({
    name,email
})
const result =  await newUser.save();
return res.status(200).json({message: "User created successfully!",result});
    }
    catch(err){
        console.log(err);
       return  res.status(500).json({message: "Internal server error!"});
    }
}

export const updateProfile = async(req,res)=> {
    const {userId} = req.params;
    try{
         
        // 
          const location = req.body;
          const imageFile = req.file;
          if (!location) {
            return res.status(400).json({ message: "Location is required" });
          }
      // 2 things in upload(file,options)
          const result = await cloudinary.uploader.upload(imageFile.path, {
            folder: "user_images",
            public_id: `user_${userId}`,
          });
          const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {location,imageFile:result.authenticated_url},
            {new:true}
          )
          if(!updatedUser){
            return res.status(404).json({message: "user not found!"})
          }
          res.status(200).json({success: true ,message: "user profile updated!",user: updatedUser})
      
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message: "Internal server error!"})
    }
}


