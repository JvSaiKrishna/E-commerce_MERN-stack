import express from "express"
import mongoose from "mongoose"
import dotEnv from "dotenv"

import cors from "cors"
import middleware from "./middleware.js"
import { vendor } from "./models/Vendor.js"

import VendorRouter from "./Router/VendorRouter.js"
import ShoppingRouter from "./Router/ShoppingRouter.js"

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


    app.use('/Shopinity/vendor', VendorRouter)
    app.use('/Shopinity', ShoppingRouter)
   



    const api = process.env.PORT || 4000
    app.listen(api, () => {
        console.log("server running at 4000")
    })

} catch (error) {
    console.log("error is : ", error)

}