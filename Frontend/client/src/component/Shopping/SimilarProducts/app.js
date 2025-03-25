import React from 'react'
import "./app.css"
import { Link } from 'react-router-dom'

const SimilarProductsData = props => {
  const { productDetails } = props
  const {id, title, brand, imageUrl, rating, price } = productDetails
  return (
    <>
      <Link style={{textDecoration:'none'}} to={`/Shopinity/products/${id}`}>
        <li className="similar-product-item">
          <div className='similar-product-image-container'>
            <img
              src={imageUrl}
              alt={`similar product ${title}`}
              className="similar-product-image"
            />
          </div>
          <p className="similar-product-title">{title}</p>
          <p className="similar-products-brand">by {brand}</p>
          <div className="similar-product-price-rating-container">
            <p className="similar-product-price">Rs {price}/-</p>
            <div className="similar-product-rating-container">
              <p className="similar-product-rating">{rating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="similar-product-star"
              />
            </div>
          </div>
        </li>
      </Link>
    </>
  )
}
export default SimilarProductsData
