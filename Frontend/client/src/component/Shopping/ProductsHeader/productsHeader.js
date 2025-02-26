import React, { useState } from 'react'
import { BsFilterRight } from "react-icons/bs";
import { IoReorderThree } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

import "./productsHeader.css"


const ProductsHeader = (props) => {
  const [isThreeLines, setisThreeLines] = useState(false)
  // const [search , setsearch] = useState('')

  const { sortByOptions, categoryOptions, onFilter, sortBy, onSearch, ratingList ,quiryParams} = props
  const {category,userFeedback} = quiryParams
  // const {name,categoryId} = categoryOptions


  const onChangeFilter = (event) => {

    onFilter(event.target.value)


  }

  const onClickThreeLines = () => {

    setisThreeLines((prev) => (!prev))
  }
  const onClickSearch = (event) => {
    if (event.key === "Enter") {
      onSearch(event.target.value)

    }



  }
  const { onThreeLines,onCategory, onRating, onClear} = props

  onThreeLines(isThreeLines)

  const onClickCategory = (id)=>{
    // console.log(id)
   
    onCategory(id)
  }

  const onClickRating = (id)=>{
    onRating(id)
  }
const onClickClear = ()=>{
  onClear()
}
const checkingOnClickCategory = (name)=>{
  const newCategory = category.includes(name)
  // console.log(category,newCategory)
  return (newCategory&& "coloring-category-btn")
}
 



  const FilteringData = () => {
    return (
      <div>
        <div className='search-container'>

          <input className='search' onKeyUp={onClickSearch} type='search' placeholder='Search' />
          <FaSearch className='search-img' />
        </div>
        <div className='filter-desktop'>

          <div className='filter '>
            <BsFilterRight className='sort-by-icon' />
            <p className='sort-by'>Sort by</p>
            <select value={sortBy} onChange={onChangeFilter} className='filter-select'>

              {sortByOptions.map(each => (
                <option value={each.optionId}>

                  {each.display}
                </option>
              ))}




            </select>
          </div>
        </div>
        <h1 className='heading'>Category</h1>
        <div className='categories-container'>

          {categoryOptions.map(each => (

            (<button  onClick={()=>(onClickCategory(each.name))} className={`category-btns 
              ${checkingOnClickCategory(each.name)}`}>{each.name}</button>)
          ))}

        </div>
        <h1 className='heading'>Rating</h1>
        <div className='ratings-container'>

          {ratingList.map(each => {
            return (<>
              <button onClick={()=>(onClickRating(each.ratingId))} className={`rating-btns `}>


                <img className="rating-img" src={each.imageUrl} alt="rating 4" />
                <p className={`and-up active-rating ${each.ratingId === userFeedback&&"coloring-rating-btn"}`}>& up</p>
              </button>
            </>)
          })}
        </div>
        <button onClick={onClickClear} className='clear-btn'>Clear Filters</button>

      </div>
    )

  }



  return (
    <>
      <div>


        <header className='products-header-container'>
          <div>
            <button onClick={onClickThreeLines} className='all-product-container three-lines-btn'>

              <IoReorderThree className='three-lines' />
              <p className='all-products-title'>All Products</p>
            </button>
          </div>
          <div className='filter-mobile'>

            <div className='filter '>
              <BsFilterRight className='sort-by-icon' />
              <p className='sort-by'>Sort by</p>
              <select value={sortBy} onChange={onChangeFilter} className='filter-select'>

                {sortByOptions.map(each => (
                  <option key={each.optionId} value={each.optionId}>

                    {each.display}
                  </option>
                ))}




              </select>
            </div>
          </div>
        </header>
        {isThreeLines && FilteringData()}

      </div>
    </>
  )
}

export default ProductsHeader