import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({

     email : {
        required : true,
        type : String,
        unique : true,
    },
    fullname : {
        required : true,
        type : String,
    },
    password : {
        type : String,
        required : true,
        length: 6,
    },
    
},
{timestamps:true}
)
const Admin = mongoose.model("admin",adminSchema)
export default Admin;