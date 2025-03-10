// import { now } from "mongoose"
import { product } from "../models/product.js"
import dotEnv from "dotenv"
import multer from "multer"
import path from "path"
import { vendor } from "../models/Vendor.js"
import {v2 as cloudinary} from "cloudinary"
import e from "cors"

dotEnv.config()


cloudinary.config({
    api_key:process.env.API_KEY,
    cloud_name:process.env.ClOUD_NAME,
    api_secret:process.env.API_SECRET
})

// const uploadFile = () => {
//     const storage = multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, "./images")
//         },
//         filename: (req, file, cb) => {
//             cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//         }
//     })

//     const upload = multer({ storage: storage })
//     return upload
// }

// const uploadFile = upload.single("file")

const addProduct = async (req, res) => {
   
    try {
        const { title, brand, price, category, rating, description,img } = req.body
        // console.log(req.body)
        const username = req.username
        const Data = await vendor.findOne({ username })
        // console.log(Data)
        const cloudinaryUpload = await cloudinary.uploader.upload(img,{
            folder:"/E-commerce"
        })
        // console.log(cloudinaryUpload.url)

        
        const newProduct = new product({
            title,
            brand,
            description,
            category,
            price: price,
            rating,
            imgUrl:cloudinaryUpload.url,
            vendor: Data._id
        })
        const savedProduct = await newProduct.save()
        Data.product.push(savedProduct)
        // console.log(savedProduct)
        await Data.save()

        res.status(200).json("product Added")
    } catch (error) {
        res.status(400).json("something missed")
        // console.log(error)
    }
}

const GetProducts = async (req, res) => {
    try {
        const username = req.username
        const Data = await vendor.findOne({ username })
        const GetProduct = await product.find({ vendor: Data._id }).populate("vendor")
        res.status(201).json(GetProduct)
    } catch (error) {
        res.status(500).json("Server Problem")
    }

}

const GetAllProducts = async (req, res) => {
    try {
        let { category, rating, title_search, sort_by } = req.query
        const price = sort_by
        if (!category) {
            category = ["Clothing", "Electronics", "Appliances", "Grocery", "Toys"]
            
            
        }
        else {
            category = category.split(",")
            
            
        }
        const Data = await product.aggregate([
            {
                $match: {
                    category: { $in: category },
                    rating: { $gte: rating },
                    title: { $regex: new RegExp(title_search, "i") }
                }
            },
            {
                $sort: { price: parseInt(price) }
            }
        ])
        // console.log(req.query)

        // console.log(Data)
        res.status(201).json(Data)

    } catch (error) {
        res.status(500).json("Server Problem")
    }

}

const GetProductById = async (req, res) => {
    try {
        const { id } = req.params
        // console.log(id)
        const getById = await product.findOne({ _id: id })
        // console.log(getById)
        const similarProducts = await product.find({category:getById.category})
        res.status(200).json({getById,similarProducts})

    } catch (error) {
        res.status(500).json("Internal Server Error")
    }

}

const UpdateProductById = async(req,res)=>{
    try {
        const {id} = req.params
        const username = req.username
        let data = req.body
        if(!data.imgUrl){
            const {imgUrl,...newData} = data
            data = newData

        }
        if(data.imgUrl){
            const cloudinaryUpload = await cloudinary.uploader.upload(data.imgUrl,{
                folder:"/E-commerce"
            })
            data.imgUrl = cloudinaryUpload.url
            
        }

        

        
        await product.findByIdAndUpdate(id,data)
        
        const userId = await vendor.findOne({username})  
        const newData = await product.find({vendor:userId})
        res.status(200).json(newData)

    } catch (error) {
        res.status(500).json("Internal server problem")
        
    }
}

const deleteById = async(req,res)=>{
    try {
        const {id} = req.params
        const username = req.username
        
        const getProduct = await product.findOne({_id:id})
         
        
        const getVendorByProductId =  await vendor.findOne({_id:getProduct.vendor._id})
        
        getVendorByProductId.product.pop(getProduct._id)
        await getVendorByProductId.save()
        await product.deleteOne({_id:id})


        const getIdByUsername = await vendor.findOne({username}) 
        const newData = await product.find({vendor:getIdByUsername})

        res.status(200).json(newData)
        // const newData = await product.find({vendor:getID._id})

    } 
    catch (error) {
        res.status(500).json("Server Problem")
        
    }
}

export {addProduct, GetProducts, GetAllProducts, GetProductById,UpdateProductById,deleteById}
