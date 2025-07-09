import express from "express"   
const adminRouter = express.Router();
import orderModel from "../models/oderModel.js"
adminRouter.get("/allorder",async(req,res)=>{
  try {

    const alloder= await orderModel.find()
    return res.status(200).json({alloder})
        
  } catch (error) {
    console.log(error)
     return res.status(500).json({ "message": "intarnal server error." })
  }


})

export default adminRouter;