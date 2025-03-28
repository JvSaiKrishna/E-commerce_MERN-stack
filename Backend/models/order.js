import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    productId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    orderId:{
        type: String,
        required : true
    },
    paymentId:{
        type: String,
        required : true
    },
    status:{
        type: String,
    }
})

const order = mongoose.model("order",orderSchema)

export default order