import React, { useContext } from 'react'
import Header from '../Header/header'
import "./cart.css"
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs'
import { counter } from '../Context/Context.js'
import { Api } from "../../Api.js"

const getDataFromLS = JSON.parse(localStorage.getItem("AddToCart") || "[]")
let productsQuantity = []

if(getDataFromLS){

  getDataFromLS.forEach(each => {
     productsQuantity.push({ id: each.id, quantity: each.count })
  })
} 
const Cart = () => {
  const { cartCount } = useContext(counter)
  // const [isLoading, setIsLoading]= useState(false)
  // window.location.reload()


  const onIncrementQuantity = (id) => {
    const getDataFromLocalStoreage = localStorage.getItem("AddToCart");
    const convertToParse = getDataFromLocalStoreage && JSON.parse(getDataFromLocalStoreage);

    let newData = convertToParse.map(eachProduct => {
      if (eachProduct.id === id) {
        return ({
          ...eachProduct,
          brand: eachProduct.brand,
          count: eachProduct.count + 1,
          description: eachProduct.description,
          id: eachProduct.id,
          imageUrl: eachProduct.imageUrl,
          price: eachProduct.price,
          rating: eachProduct.rating,
          title: eachProduct.title
        })
      }
      else {
        return (eachProduct)

      }
    })

    localStorage.setItem('AddToCart', JSON.stringify(newData))

    // const quantityCount = productsQuantity.map(each => {
    //   if (each.id === id) {
    //     return { ...each, quantity: each.quantity + 1 }
    //   }
    //   return (each)
    // })
    // productsQuantity = quantityCount
    // setIsLoading(prev=>!prev)
    window.location.reload()
  }
  const onDecrementQuantity = (id) => {
    const getDataFromLocalStoreage = localStorage.getItem("AddToCart");
    const convertToParse = getDataFromLocalStoreage && JSON.parse(getDataFromLocalStoreage);

    let newData = convertToParse.map(eachProduct => {
      if (eachProduct.id === id) {
        if (eachProduct.count > 1) {
          return ({
            ...eachProduct,
            brand: eachProduct.brand,
            count: eachProduct.count - 1,
            description: eachProduct.description,
            id: eachProduct.id,
            imageUrl: eachProduct.imageUrl,
            price: eachProduct.price,
            rating: eachProduct.rating,
            title: eachProduct.title
          })
        }
      }
      return (eachProduct)


    })
    localStorage.setItem('AddToCart', JSON.stringify(newData))

    // const quantityCount = productsQuantity.map(each => {
    //   if (each.id === id) {
    //     if (each.quantity > 1) {

    //       return { ...each, quantity: each.quantity - 1 }
    //     }
    //   }
    //   return (each)
    // })
    // productsQuantity = quantityCount
    // setIsLoading(prev=>!prev)

    window.location.reload()
  }

  const onClickRemove = (id) => {
    const newData = getDataFromLS.filter(each => {
      return (each.id !== id)
    });

    console.log(newData)
    localStorage.setItem('AddToCart', JSON.stringify(newData))
    window.location.reload()

  }

  

  // console.log(productsQuantity)

  return (<>
    <Header />
    <div className='container'>
      <div>
        <h2 className='cart-product-name'>Products Cart</h2>

        {cartCount ?
          <div>
            {getDataFromLS.map(each => {
              return (<>
                <div key={each.id} className='cart-product-container'>

                  <img className='cart-product-img' src={`${Api}/${each.imageUrl}`} alt='product img' />
                  <div className='cart-product-details'>
                    <p className='cart-product-title'>Title: {each.title}</p>
                    <p className='cart-product-brand'>Brand: {each.brand}</p>
                    <p className='cart-product-price'>Price: ₹{each.price}/-</p>

                  </div>
                  <div className='cart-product-count-container'>
                    <button onClick={() => onDecrementQuantity(each.id)} className='quantity-controller-button'>
                      <BsDashSquare className=" icon-color quantity-controller-icon" />

                    </button>

                    <p className='cart-product-count'>{each.count}</p>
                    <button className='quantity-controller-button'>
                      <BsPlusSquare onClick={() => onIncrementQuantity(each.id)} className="quantity-controller-icon icon-color" />

                    </button>
                  </div>
                  <div className='cart-product-remove-container'>

                    <button onClick={() => onClickRemove(each.id)} className='cart-product-remove'>Remove</button>
                  </div>
                </div>

              </>)
            })}
          </div>
          : (<>
            <div className ='empty-cart-container' >

              <img className='empty-cart-img'  src='https://static.vecteezy.com/system/resources/previews/004/964/514/original/young-man-shopping-push-empty-shopping-trolley-free-vector.jpg' alt='Cart Empty' />
            </div>
          </>)
        }
      </div>
    </div>
  </>
  )
}


export default Cart
