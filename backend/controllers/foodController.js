import foodModel from "../models/foodModel.js";
import fs from 'fs'
import cloudinary from "../config/cloudinary.js"

//add item

const addFood = async (req,res) => {
   console.log(req.file);
   let image_filename = req.file.path;
   console.log(image_filename)

if (!image_filename) {
                return res.status(400).json({ error: "No file uploaded" });
            }
            const cloudinaryResponse = await cloudinary.uploader.upload(image_filename, {
                folder: "user_profiles", // Optional folder in Cloudinary
            });
            fs.unlinkSync(req.file.path);
            const imgurl = cloudinaryResponse.secure_url;

   const food = new foodModel({
      name:req.body.name,
      description:req.body.description,
      price:req.body.price,
      category:req.body.category,
      image:imgurl
   })
   try{
      await food.save();
      res.json({success:true,message:"plant Added"})
   }catch(error){
      console.log(error)
      res.json({success:false,message:"Error"})
   }
}


const listFood = async (req,res) =>{
    try {
      const foods = await foodModel.find({});
      res.json({success:true,data:foods})
    } catch (error) {
     console.log(error);
     res.json({success:false,message:"Error"})
    }
}

//remove food item
const removeFood = async (req,res) =>{
   try {
      const food = await foodModel.findById(req.body.id);
      fs.unlink(`uploads/${food.image}`,()=>{})

      await foodModel.findByIdAndDelete(req.body.id);
      res.json({success:true,message:"Plante Removed"})
   } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
   }
}



export {addFood,listFood,removeFood}