import { generatetoken } from "../lib/util.js";
import Admin from "../model/adminModel.js";
import bcrypt from "bcrypt";

export const signup = async (req,res) => {
  const {fullname,email,password} = req.body;

  try{
    if(!fullname || !email ||!password){
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be a minimum of 6 characters" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newadmin= new Admin({
      fullname,
      email,
      password:hashedPassword
    });

    await newadmin.save()

    generatetoken(newadmin._id,res)

    res.status(201).json({
      admin:{
        id: newadmin._id,
        email: newadmin.email,
        fullname: newadmin.fullname
      }
    })
  }

  catch(error){
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal server error in signup controller" });
  }
}


//Login

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token and set cookie
    const token = generatetoken(user._id, res);

    // ✅ Send a proper response after setting the cookie
    res.status(200).json({
      message: "Login successful",
     
      user: {
        id: user._id,
        name: user.fullname,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal server error in login controller" });
  }
};

export const logout =  async ( req,res)=>{
        try{
            res.cookie("jwt","",{maxAge:0})
            res.status(200).json({message: " Logged out successfully"})

        }catch(error){
            console.log("Error in logout controllers",error.message)
            res.status(500).json({message : "Internal server Error in logout controllers"})
        }
};

export const CheckAuth = (req, res) => {
    try {
      res.status(200).json({ message: "Authorized", user: req.user });
    } catch (error) {
      console.log("Error in CheckAuth:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };