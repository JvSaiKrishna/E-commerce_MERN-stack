import React from 'react'
import { Link } from 'react-router-dom'

const HomePageToEnter = () => {
  return (
    <>
    <div className='container'>

    <div className='inner-container'>
                <h1 className='shopinity'>Welcome To Shopinity</h1>
                <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png' alt='website' className='website-logo'/>
                <p className='landing-page-description'>Shopinity is a cutting-edge e-commerce platform designed to make shopping faster, easier, and more enjoyable. With a sleek user interface, smart features, and a wide range of products, Shopinity offers a seamless shopping experience tailored to modern consumers. Whether you're looking for fashion, electronics, home essentials, or unique treasures, Shopinity has it all at your fingertips.</p>
                <Link to="/Shopinity/login">
                <button className='landing-page-button'>Shop Now</button>
                </Link>
                <Link to='/Shopinity/vendor/login'>
                <button className='landing-page-button'>Sell Products</button>
                </Link>
            </div>
    </div>
    </>
  )
}

export default HomePageToEnter