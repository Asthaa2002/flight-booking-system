import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

name: {
    type:String,
},

email:{
type:String
},
location: {
    type:String
},

imageFile: {
    name: {
      type: String,
    },
    url: {
      type: String,
    },
    path: {
      type: String,
    },
  },

},
{timestamps:true}
);
export default  mongoose.model("User",userSchema)