
import mongoose from "mongoose"
import { type } from "os";

const orderSchema = new mongoose.Schema({
   userId:{type:mongoose.Schema.Types.ObjectId, ref: 'user',
        required: true},
   items:{type:String,required:true},
   amount:{type:Number,required:true},
   quantity:{type:Number,require:true},
   address:{type:Object,required:true},
   status:{type:String,default:"Oder Packed Processing"},
   date:{type:Date,default:Date.now()},
   payment:{type:Boolean,default:false}
})

const orderModel = mongoose.models.order || mongoose.model("order",orderSchema)

export default orderModel;