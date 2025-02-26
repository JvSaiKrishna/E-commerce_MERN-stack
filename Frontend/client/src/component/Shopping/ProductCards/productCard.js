import { Link } from 'react-router-dom'
import "./productCard.css"
import {Api} from "../../Api.js"

export default function ProductCard(props) {
  const { productData } = props
  const { title, brand, imageUrl, rating, price, id } = productData;
  // console.log(productData)

  return (<>
    <Link to={`/Shopinity/products/${id}`} className="product-item">
      <li >
        <div className='product-img-container'>
          <img src={`${Api}/${imageUrl}`} alt="product" className="all-products-img" />
        </div>
        <div className='product-details-container'>


          <h1 className="title">{title}</h1>
          <p className="brand">by {brand}</p>
          <div className="product-details">
            <p className="price">Rs {price}/-</p>
            <div className="rating-container">
              <p className="rating">{rating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="star"
              />
            </div>
          </div>
        </div>
      </li>
    </Link>
  </>

  )
}
