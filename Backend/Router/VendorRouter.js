import express from "express"
import { registration, login, profile,profileUpdate } from "../collectors/vendorCollectors.js"
import middleware from "../middleware.js"
import { addProduct, GetProducts,UpdateProductById,deleteById } from "../collectors/productCollectors.js"

const router = express.Router()

router.post('/registration',registration)
router.post('/login',login)
router.get('/get-profile',middleware,profile)
router.put('/profile-update',middleware,profileUpdate)

// const upload = uploadFile()
router.post('/add-product', middleware, addProduct)
router.get('/get-products',middleware,GetProducts)
router.post('/update-product/:id',middleware,UpdateProductById)
router.post('/delete/:id',middleware,deleteById)

export default router