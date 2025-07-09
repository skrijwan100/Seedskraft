import express from "express"
import authMiddleware from "../middleware/auth.js"
import Razorpay from "razorpay"
import crypto from "crypto"
import orderModel from "../models/oderModel.js"
// const Razorpay = require('razorpay');
const orderRouter = express.Router();
const razorpay=new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})
orderRouter.post("/create-order", async (req, res) => {
    try {
      const { amount, currency = 'INR', receipt = 'receipt#1' } = req.body;
      console.log(amount);
  
      const options = {
        amount: amount * 100, // Razorpay expects amount in paise
        currency,
        receipt,
      };
  
      const order = await razorpay.orders.create(options);
      res.json({
        status: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      });
  
    } catch (error) {
      console.error('Order creation failed:', error);
      res.status(500).json({ status: false, error: 'Failed to create order' });
    }
  });

  orderRouter.post('/verify-payment', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
    const secret = process.env.RAZORPAY_KEY_SECRET;
  
    // Generate expected signature
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');
  
    if (generated_signature === razorpay_signature) {
      // Signature is valid
      res.json({ status: true, message: 'Payment verified successfully' });
    } else {
      // Signature mismatch
      res.status(400).json({ status: false, message: 'Invalid signature' });
    }
  });

orderRouter.post("/addorder", authMiddleware, async (req, res) => {
    try {
        const { items, amount, address,payment,quantity } = req.body;
        console.log(req.userId);
        const neworder = await orderModel({
            items:items,
            amount,
            quantity,
            address,
            payment,
            userId: req.userId
        })
        neworder.save();
        return res.status(200).json({status:true,neworder})
    } catch (error) {
        console.log(error)
        res.status(500).json({ "message": "intarnal server error." })
    }
})
orderRouter.get("/fecthorder", authMiddleware , async (req, res) => {
    try {
        let oneorder = await orderModel.findOne({ userId: req.userId })
        if (oneorder == null) {
            return res.status(404).json({ "massage": "No order found", "status": false })
        }
        let allorder = await orderModel.find({  userId: req.userId })

        return res.status(200).json({ allorder })
    } catch (error) {
        console.log(error)
        res.status(500).json({ "message": "intarnal server error." })
    }

})
export default orderRouter;