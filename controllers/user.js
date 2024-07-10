import userModel from "../models/user.js";

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


