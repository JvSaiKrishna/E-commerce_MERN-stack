import mongoose from "mongoose";
import { type } from "os";

const vendorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true
    },
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }

    ]
})

const vendor = mongoose.model("vendor", vendorSchema)

export { vendor }