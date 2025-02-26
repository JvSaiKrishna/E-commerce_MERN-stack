import express from "express"
import mongoose from "mongoose"
import dotEnv from "dotenv"
import { registration, login, profile } from "./collectors/vendorCollectors.js"
import cors from "cors"
import middleware from "./middleware.js"
import { vendor } from "./models/Vendor.js"
import { addProduct, uploadFile, GetProducts, GetAllProducts, GetProductById,deleteById } from "./collectors/productCollectors.js"
import { userRegistration, userLogin } from "./collectors/userCollectors.js"


try {


    const app = express()
    app.use(cors({
        origin: "*"

    }))
    app.use(express.json())
    app.use(express.static('images'))

    dotEnv.config()
    const url = process.env.Mongoose_url


    mongoose.connect(url)
        .then(() => (
            console.log("Db Connected")
        ))
        .catch((error) => (
            console.error("error :", error)
        ))




    app.get('/', (req, res) => {
        res.send(`<h1>Welcome to Shopinity`)
    })
    app.get('/getdata', middleware, async (req, res) => {
        const getAllData = await vendor.find()
        const username = req.username
        res.json([{ username }, getAllData])

    })


    app.post('/Shopinity/vendor/registration', registration)
    app.post('/Shopinity/vendor/login', login)

    const upload = uploadFile()
    app.post('/Shopinity/vendor/add-product', middleware, upload.single("file"), addProduct)
    app.get('/Shopinity/vendor/get-products', middleware, GetProducts)
    app.get('/Shopinity/vendor/get-profile', middleware, profile)
    app.post('/Shopinity/vendor/delete/:id', middleware, deleteById)



    app.post('/Shopinity/registration', userRegistration)
    app.post('/Shopinity/login', userLogin)
    app.get('/Shopinity/get-all-products', middleware, GetAllProducts)
    app.get('/Shopinity/products/:id', middleware, GetProductById)




    const api = process.env.PORT || 4000
    app.listen(api, () => {
        console.log("server running at 4000")
    })

} catch (error) {
    console.log("error is : ", error)

}