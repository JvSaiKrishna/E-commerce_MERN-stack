import React, {  useEffect } from 'react'
import Header from '../Header/header'
import "./cart.css"
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs'
import {ThreeCircles} from 'react-loader-spinner'
import {useDispatch} from "react-redux"
import { cartCount, DecrementProductQuantity, FetchCartProducts, IncrementProductQuantity, RemoveProductFromCart } from '../CartSlice/CartSlice.js'
import { useSelector } from 'react-redux'

const Cart = () => {
  // const [cartProducts, setCartProducts] = useState([])
  const {cartProducts,loading} = useSelector((state)=>state.cartCounter)

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(FetchCartProducts())
  }, [dispatch])
  useEffect(() => {
    dispatch(cartCount())
  }, [dispatch,cartProducts])


  const onIncrementQuantity = (id,products) => {
    dispatch(IncrementProductQuantity({id,products}))
  }
  const onDecrementQuantity = async (quantity,id,products) => {
    dispatch(DecrementProductQuantity({quantity,id,products}))
    }

  const onClickRemove = async(id) => {
    dispatch(RemoveProductFromCart(id))
  }


  const renderProductsList = ()=>{
    return (
      <>
      <div className='container'>
      <div>
        <h2 className='cart-product-name'>Products Cart</h2>

        {cartProducts?.length !== 0 ?
          <div key={Math.random()} className='cart-products-container'>
            {cartProducts?.map(each => {
              return (<>
                <div key={each._id} className='cart-product-container'>
                  <div className='cart-product-img-container'>

                    <img className='cart-product-img' src={each.productId.imgUrl} alt='product img' />
                  </div>
                  <div className='cart-product-details-count-remove-container'>

                    <div className='cart-product-details'>
                      <p className='cart-product-title'>Title: {each.productId.title}</p>
                      <p className='cart-product-brand'>Brand: {each.productId.brand}</p>
                      <p className='cart-product-price'>Price: ₹{each.productId.price}/-</p>

                    </div>
                    <div className='cart-product-count-remove-container'>
                      <div className='cart-product-count-container'>
                        <button onClick={() => onDecrementQuantity(each.quantity,each._id,cartProducts)} className='quantity-controller-button'>
                          <BsDashSquare className=" icon-color quantity-controller-icon" />

                        </button>

                        <p className='cart-product-count'>{each.quantity}</p>
                        <button className='quantity-controller-button'>
                          <BsPlusSquare onClick={() => onIncrementQuantity(each._id,cartProducts)} className="quantity-controller-icon icon-color" />

                        </button>
                      </div>
                      <div className='cart-product-remove-container'>

                        <button onClick={() => onClickRemove(each._id)} className='cart-product-remove'>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>

              </>)
            })}
          </div>
          : (<>
            <div className='empty-cart-container' >

              <img className='empty-cart-img' src='https://static.vecteezy.com/system/resources/previews/004/964/514/original/young-man-shopping-push-empty-shopping-trolley-free-vector.jpg' alt='Cart Empty' />
            </div>
          </>)
        }
      </div>
    </div>
      </>
    )
  }

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




  return (<>
    <Header />
    {loading ? renderLoader() : renderProductsList()}
    
  </>
  )
}


export default Cart
