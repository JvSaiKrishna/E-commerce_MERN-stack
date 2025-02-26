import express from "express"
import { registration, login, profile } from "../collectors/vendorCollectors.js"
import middleware from "../middleware.js"
import { addProduct, uploadFile, GetProducts,deleteById } from "../collectors/productCollectors.js"

const router = express.Router()

router.post('/registration',registration)
router.post('/login',login)
router.get('/get-profile',middleware,profile)

const upload = uploadFile()
router.get('/add-product', middleware, upload.single("file"), addProduct)
router.get('/get-products',middleware,GetProducts)
router.post('/delete/:id',middleware,deleteById)

export default router