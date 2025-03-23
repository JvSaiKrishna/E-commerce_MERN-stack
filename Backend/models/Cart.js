import mongoose from "mongoose"
import user from "./user.js"
import {product} from "./product.js"


const CartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:user,
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:product,
        required:true
    },
    quantity:{
        type:Number
    }
})

const cart = mongoose.model("cart",CartSchema)
export {cart}