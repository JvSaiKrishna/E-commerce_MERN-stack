import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePageToEnter from "./EnterToHomepage.js"
import { VendorRegistration } from './Vendor/VendorForms/Registration'
import MyProfile from './Vendor/MyProfile'
import AddProduct from './Vendor/VendorForms/AddProduct'
import GetProducts from './Vendor/VendorForms/GetProducts'
import NotFound from "./Shopping/NotFound"
import VendorHome from './Vendor/Home'
import VendorLogin from './Vendor/VendorForms/Login'

import Login from './Shopping/Login/login'
import Home from './Shopping/Home/Home'
import Product from './Shopping/Products/product'
import ProductsItemDetails from './Shopping/ProductsItemsDetails/app'
import Cart from './Shopping/Cart/cart'
import Registration from './Shopping/Registration/Registration'




const Landingpage = () => {

    
    return (
        <>
            <Routes>
                <Route exact path='/' element={<HomePageToEnter />} />
                <Route exact path='/Shopinity' element={<HomePageToEnter />} />
                <Route exact path='/Shopinity/vendor' element={<VendorHome />} />
                <Route exact path='/Shopinity/vendor/registration' element={<VendorRegistration />} />
                <Route exact path='/Shopinity/vendor/login' element={<VendorLogin />} />
                <Route exact path='/Shopinity/vendor/get-profile' element={<MyProfile />} />
                <Route exact path="/Shopinity/vendor/add-product" element={<AddProduct />} />
                <Route exact path="/Shopinity/vendor/get-products" element={<GetProducts />} />




                <Route exact path='/Shopinity/login' element={<Login />} />
                <Route exact path='/Shopinity/registration' element={<Registration />} />
                <Route exact path="/Shopinity/home" element={<Home />} />
                <Route exact path='/Shopinity/products' element={<Product />} />
                <Route extact path='/Shopinity/products/:id' element={<ProductsItemDetails />} />
                <Route extact path='/Shopinity/cart' element={<Cart />} />

                <Route path="*" element={<NotFound />} />
            </Routes>








        </>

    )
}

export default Landingpage