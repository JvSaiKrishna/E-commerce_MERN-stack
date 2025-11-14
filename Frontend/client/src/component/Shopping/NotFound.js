import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='not-found-container'>
      <img src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png" alt="not found" className='not-found-img' />
      <Link to="/Shopinity/products">
        <button type="button" className="shop-now-button">Shop Now</button>
      </Link>
    </div>
  )
}
