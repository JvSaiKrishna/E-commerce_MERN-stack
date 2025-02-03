import React from 'react'
import Sidebar from './Sidebar'
import Cookies from "js-cookie"
import { Navigate } from 'react-router-dom'
import Navbar from './Navbar'

const VendorHome = () => {
  const jwt = Cookies.get("jwt_token")
  // console.log(jwt)
  if (!jwt) {
    return <Navigate to="/Shopinity/vendor/login" replace />
  }
  return (
    <>
      <div className='vendor-page-container'>
        <Navbar />

        <div className='sidebar-form-container'>
          <Sidebar />

          <div className='vendor-homepage-background'>
            <h1 className='vendor-homepage-heading'>
              Welcom to Shopinity App
            </h1>
            <img className='vendor-homepage-img' src='https://www.libertyid.com/wp-content/uploads/2017/10/ecommerce-2140604_1920.jpg' alt='Home Page logo' />
            <p>Let's Start Selling Products And Earn Money</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default VendorHome