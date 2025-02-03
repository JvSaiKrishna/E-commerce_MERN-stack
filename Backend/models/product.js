import mongoose from "mongoose";
// import { vendor } from "./Vendor";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    imgUrl:{
        type:String,
        
    },
    category:{
        type:String,
    },
    price:
    {
        type:Number,
        required:true
    },
    rating:
    {
        type: String,
        required:true
    },
    description:
    {
        type: String,
        required:true
    },
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"vendor"
    }
})

const product  = mongoose.model("product",productSchema)

export {product}