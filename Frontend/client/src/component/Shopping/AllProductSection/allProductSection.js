import React, { useState, useEffect } from 'react'
import {ThreeCircles} from 'react-loader-spinner'
import Cookies from "js-cookie"
import ProductCard from '../ProductCards/productCard'
import "./allProductSection.css"
import {Api} from "../../Api.js"





export default function AllProductSection(props) {
  const [productsList, setproductsList] = useState([])
  // const [duplicateData, setduplicateData] = useState([])
  const [isLoader, setisLoader] = useState(false)




  const { sortBy, quiryParams } = props
  // const {search} = quiryParams
  // console.log(sortBy)

  useEffect(() => {
    FetchProducts(sortBy, quiryParams)
  }, [sortBy, quiryParams])

  const FetchProducts = async (sortBy, quiryParams) => {
    // console.log(sortBy,quiryParams)
    setisLoader(true)
    const jwToken = Cookies.get('jwToken')
    // const url = `https://apis.ccbp.in/products?sort_by=${sortBy}&title_search=${quiryParams.search}&category=${quiryParams.category}&rating=${quiryParams.userFeedback}`
    const url = `${Api}/Shopinity/get-all-products?sort_by=${sortBy}&title_search=${quiryParams.search}&category=${quiryParams.category}&rating=${quiryParams.userFeedback}`
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwToken}`
      }
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const updatedData = data.map((product) => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product._id,
        imageUrl: product.imgUrl,
        rating: product.rating,
      }));
      setproductsList(updatedData)
      // setduplicateData(updatedData)
      setisLoader(false)

    }

  }




  const renderProductsList = () => {

    return (
      <div>


        <ul className="products-list">
          {productsList.length ? productsList.map((product) => (
            <ProductCard productData={product} key={product.id} />
          )) : (<div className='no-products-container'>
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png " alt="No products" />
            <h3>No Products Found</h3>
            <p>We could not find any products. Try other filters.</p>
          </div>)}
        </ul>
      </div>
    );
  };

  const renderLoader = () => (
    <div className="products-loader-container">

      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )

  return (
    <>
      {isLoader ? renderLoader() : renderProductsList()}
    </>

  )
}

