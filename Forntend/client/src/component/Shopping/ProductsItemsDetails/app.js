import React, { useEffect, useState, useContext } from 'react'
import Cookies from "js-cookie"
import { useParams, Link } from "react-router-dom"
import SimilarProductsData from '../SimilarProducts/app'
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs'
import "./app.css"
import Header from "../Header/header.js"
import {ThreeCircles} from "react-loader-spinner"
// import Cart from '../Cart/cart.js'
import { counter } from '../Context/Context.js'
import {Api} from "../../Api.js"



const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

// localStorage.setItem("AddToCart","[]")
// console.log(JSON.parse(localStorage.getItem("AddToCart")))
// console.log(JSON.parse(localStorage.getItem("AddToCart")).length)
// localStorage.clear("AddToCart")



// const totalReviews = Math.floor(Math.random()*2000)

export default function ProductsItemDetails() {
    // const [ dependency ] = useState(1)
    const [status, setstatus] = useState(apiStatusConstants.initial)
    const [quantity, setquantity] = useState(1)
    const [items, setitems] = useState({
        selectedProduct: [],
        similarProducts: []
    })
    const {setCartCount} = useContext(counter)

    // const navigate = useNavigate()
    const { id } = useParams()



    useEffect(() => {
        const getFormattedData = data => ({
            // availability: data.availability,
            brand: data.brand,
            description: data.description,
            id: data._id,
            imageUrl: data.imgUrl,
            price: data.price,
            rating: data.rating,
            title: data.title,
            count: 0
            // totalReviews: data.total_reviews,
        })
    
        const FetchProductsAsPerId = async (id) => {
            setstatus(apiStatusConstants.inProgress)
    
            const jwTOken = Cookies.get("jwToken")
            const url = `${Api}/Shopinity/products/${id}`
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwTOken}`
                },
                method: "GET"
            }
            const response = await fetch(url, options)
            if (response.ok === true) {
                const data = await response.json()
                // console.log(data.similarProducts)
                const updatedSelectedProduct = getFormattedData(data.getById)
                const updatedSimilarProducts = data.similarProducts.map(eachProduct => {
                    return getFormattedData(eachProduct)
    
                })
    
                setitems({
                    selectedProduct: updatedSelectedProduct,
                    similarProducts: updatedSimilarProducts
                })
                setstatus(apiStatusConstants.success)
            }
            else {
                setstatus(apiStatusConstants.failure)
            }
    
        }
        FetchProductsAsPerId(id)
        // console.log("useeffect")
    }, [id])


    const onIncrementQuantity = () => {
        setquantity((prev) => {
            return prev + 1
        })
    }
    const onDecrementQuantity = () => {
        if (quantity > 1) {
            setquantity((prev) => {
                return prev - 1
            })
        }
    }

    const onClickAddCart = (productMoveTOCart) => {

        const getDataFromLocalStoreage = localStorage.getItem("AddToCart");
        const convertToParse = JSON.parse(getDataFromLocalStoreage || "[]");
        
        let isPresent = [];
        let newData = [];
        if(convertToParse){
            newData = convertToParse.map(eachProduct=>{
                isPresent.push(eachProduct.id ===productMoveTOCart.id)
                if(eachProduct.id ===productMoveTOCart.id){
                    return ({...eachProduct,
                        brand:eachProduct.brand,
                        count:eachProduct.count+parseInt(quantity),
                        description:eachProduct.description,
                        id:eachProduct.id,
                        imageUrl:eachProduct.imageUrl,
                        price:eachProduct.price,
                        rating:eachProduct.rating,
                        title:eachProduct.title
                    })
                }
                else{
                    return (eachProduct)
    
                }
            })

        }
        
        if(isPresent.includes(true) === false){
            newData = [...newData,{...productMoveTOCart,count:parseInt(quantity)}]
        }       
        
        localStorage.setItem('AddToCart',JSON.stringify(newData))
        setCartCount(JSON.parse(localStorage.getItem("AddToCart")).length)
        // console.log(JSON.parse(localStorage.getItem("AddToCart")).length)

    }


    const renderProductView = () => {
        const {
            // availability,
            brand,
            description,
            imageUrl,
            price,
            rating,
            title,
            // totalReviews,
        } = items.selectedProduct

        return (
            <>

                <div className="product-details-view-container">
                    <div className="product-image-details-container">
                        <img src={`${Api}/${imageUrl}`} alt="product" className="product-image" />
                        <div className="product-details">
                            <h1 className="product-name">{title}</h1>
                            <p className="product-price">Rs {price}/-</p>
                            <div className="rating-review">
                                <div className="rating-container">
                                    <p className="rating">{rating}</p>
                                    <img
                                        src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                                        alt="star"
                                        className="star-image"
                                    />
                                </div>
                                <p className="review-count">0 Reviews</p>
                            </div>
                            <p className="product-description">{description}</p>
                            <div className="label-value-container">
                                <p className="label">Available:</p>
                                <p className="value">In</p>
                            </div>
                            <div className="label-value-container">
                                <p className="label">Brand:</p>
                                <p className="value">{brand}</p>
                            </div>
                            <hr className="horizontal-line" />
                            <div className="quantity-container">
                                <button
                                    type="button"
                                    className="quantity-controller-button"
                                    onClick={onDecrementQuantity}
                                    data-testid="minus"
                                >
                                    <BsDashSquare className="quantity-controller-icon" />
                                </button>
                                <p className="quantity">{quantity}</p>
                                <button
                                    type="button"
                                    className="quantity-controller-button"
                                    onClick={onIncrementQuantity}
                                    data-testid="plus"
                                >
                                    <BsPlusSquare className="quantity-controller-icon" />
                                </button>
                            </div>
                            <button onClick={()=>onClickAddCart(items.selectedProduct)} type="button" className="button add-to-cart-btn">
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                    <h1 className="similar-products-heading">Similar Products</h1>
                    <ul className="similar-products-list">
                        {items.similarProducts.map(eachSimilarProduct => (
                            <SimilarProductsData
                                productDetails={eachSimilarProduct}
                                key={eachSimilarProduct.id}
                            />
                        ))}
                    </ul>
                </div>

            </>

        )

    }

    const renderFailureView = () => {
        return <div className="product-details-failure-view-container">
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
                alt="failure view"
                className="failure-view-image"
            />
            <h1 className="product-not-found-heading">Product Not Found</h1>
            <Link to="/Shopinity/products">
                <button type="button" className="button">
                    Continue Shopping
                </button>
            </Link>
        </div>

    }

    const renderLoaderView = () => (
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


    const renderApiStatusViews = () => {

        switch (status) {
            case apiStatusConstants.success:
                return renderProductView()
            case apiStatusConstants.failure:
                return renderFailureView()
            case apiStatusConstants.inProgress:
                return renderLoaderView()
            default:
                return null
        }
    }


    return (
        <>
            <Header />
            <div className='container'>

            <div className="product-item-details-container">

                {renderApiStatusViews()}
            </div>
            </div>
        
        </>
    )

}