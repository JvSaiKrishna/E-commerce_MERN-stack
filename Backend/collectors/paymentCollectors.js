import Razorpay from "razorpay"
import dotEnv from "dotenv"
import crypto from "crypto"
import order from "../models/order.js"
import { cart } from "../models/Cart.js"


dotEnv.config()

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
})



const orderCreate = async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1,
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Not able to create order. Please try again!' });
    }
}

const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generated_signature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

    if (generated_signature === razorpay_signature) {
        const newOrder = new order({
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            status: "Paid"
        })
        await newOrder.save()
        const savedOrder = await order.findOne({ orderId: razorpay_order_id })
        const products = await cart.find({ userId: req.userId })
        for (let i = 0; i < products?.length; i++) {
            savedOrder.productId.push(products[i].productId)
        }
        await savedOrder.save()
        res.status(200).json({ message: "Payment verified successfully", payment_id: razorpay_payment_id });
    } else {
        res.status(400).json({ message: "Payment verification failed" });
    }
}

export { orderCreate, verifyPayment }