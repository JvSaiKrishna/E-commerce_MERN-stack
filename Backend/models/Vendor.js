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
    img:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg"
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