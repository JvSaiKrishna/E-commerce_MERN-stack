import React, { useState } from 'react'
import { Navigate } from 'react-router'
import Cookies from "js-cookie"
import AllProductSection from '../AllProductSection/allProductSection'
// import PrimeProducts from '../PrimeProducts/primeProducts'
import ProductsHeader from "../ProductsHeader/productsHeader.js"
import "./product.css"
import Header from '../Header/header.js'

const sortByOptions = [{
  optionId: -1,
  display: "Price (High - Low)"

},
{
  optionId: 1,
  display: "Price (Low - High)"
}]

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const ratingList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

function Product() {
  const [sortBy, setsortBy] = useState(sortByOptions[0].optionId)
  const [threeLines, setthreeLines] = useState('')
  const [quiryParams, setquiryParams] = useState({
    search: "",
    category: [],
    userFeedback: ""
  })



  const jwToken = Cookies.get('jwToken')

  if (jwToken === undefined) {
    return <Navigate to="/login" replace />
  }


  const onFilter = (optionId) => {
    // console.log(optionId)
    setsortBy(optionId)

  }
  const onSearch = (text) => {
    setquiryParams(prev => ({
      ...prev, search: text
    }))




  }
  const onThreeLines = (isThreeLines) => {
    // console.log(isThreeLines)
    if (isThreeLines === true) {

      setthreeLines('productsHeader-producysSection-container-clicked')
    }
    else {
      setthreeLines("productsHeader-producysSection-container")
    }

  }
  const onCategory = (id) => {
    // console.log(id)
    setquiryParams((prev) => ({
      ...prev, category: [...prev.category,id]
    }))

  }
  const onRating = (id) => {
    // console.log(id)
    setquiryParams((prev) => ({
      ...prev, userFeedback: id
    }))

  }
  const onClear = (() => (
    setquiryParams({
      search:"",
      category:"",
      userFeedback:""

    })
  ))
  // console.log(quiryParams)


  return (<>
  <Header/>
  <div className='container'>

  {/* <PrimeProducts /> */}
    <div className={threeLines}>

      <ProductsHeader quiryParams ={quiryParams} categoryOptions={categoryOptions} ratingList={ratingList} sortByOptions={sortByOptions} onFilter={onFilter} onSearch={onSearch} sortBy={sortBy} onThreeLines={onThreeLines} onCategory={onCategory} onRating={onRating} onClear={onClear} />
      <AllProductSection sortBy={sortBy} quiryParams={quiryParams} />
    </div>
  </div>
  </>)
}

export default Product