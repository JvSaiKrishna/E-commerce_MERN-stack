import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePageToEnter = () => {
  const navigate =useNavigate()
  return (
    <>
      <div className='container'>
        <div className='inner-container'>
          <h1 className='shopinity'>Welcome To Shopinity</h1>
          <div className='logo-desc-container'>
            <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png' alt='website' className='website-logo' />
            <div className='desc-container'>
              <p className='landing-page-description'>Shopinity is a cutting-edge e-commerce platform designed to make shopping faster, easier, and more enjoyable. With a sleek user interface, smart features, and a wide range of products, Shopinity offers a seamless shopping experience tailored to modern consumers. Whether you're looking for fashion, electronics, home essentials, or unique treasures, Shopinity has it all at your fingertips.</p>
              <div className='landing-page-button-container'>

                
                  <button onClick={()=>{
                    navigate("/Shopinity/login")
                  }} className='landing-page-button'>Shop Now</button>
                
                  <button onClick={()=>navigate('/Shopinity/vendor/login')} className='landing-page-button'>Sell Products</button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePageToEnter