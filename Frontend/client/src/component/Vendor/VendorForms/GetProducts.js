import React, { useEffect, useRef, useState } from 'react'
import Cookies from "js-cookie"
import { Navigate } from 'react-router-dom'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import Pagination from '../pagination'
import { Api } from '../../Api'
import { BallTriangle } from "react-loader-spinner"


// dotEnv.config()
// console.log(process.env.Api)
const limit = 3
// let pageNum = []

const GetProducts = () => {

    const [getProducts, setGetProducts] = useState([])
    const [perpage, setPerPage] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [productsData, setProductsData] = useState({
        title: '',
        brand: '',
        description: '',
        category: '',
        price: '',
        rating: ''
    })
    const [img, setImg] = useState('')
    const productId = useRef(null)





    useEffect(() => {
        const FetchAllProducts = async () => {
            const jwt = Cookies.get("jwt_token")
            setIsLoading(true)
            const url = `${Api}/Shopinity/vendor/get-products`
            const options = {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    "Content-Type": "application/json"
                }
            }
            const res = await fetch(url, options)
            const data = await res.json()
            if (res.ok) {
                setPerPage(data.slice(0, limit))
                setGetProducts(data)
                setIsLoading(false)
                // if (data.length > 0) {

                //     setowner(data[0].vendor.username)
                // }

            }
            else {
                console.log(data)

            }
        }
        FetchAllProducts()

    }, [])


    const onChangeHandle = (event) => {
        setProductsData((prev) => {
            return { ...prev, [event.target.name]: event.target.value }
        })
    }

    const onChangeImage = (event) => {
        const file = event.target.files[0]
        if (file) {

            let reader = new FileReader();
            reader.onloadend = () => {
                setImg(reader.result)

            };
            reader.readAsDataURL(file)
        }

    }






    const jwt = Cookies.get("jwt_token")
    // console.log(jwt)
    if (!jwt) {
        return <Navigate to="/Shopinity/vendor/login" replace />
    }

    const pageHandler = (pgNum) => {
        setCurrentPage(pgNum)

        setPerPage(getProducts.slice((pgNum * limit) - limit, pgNum * limit))
    }

    const onClickDelete = async (id) => {
        const url = `${Api}/Shopinity/vendor/delete/${id}`
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }

        }
        const res = await fetch(url, options)
        const data = await res.json()
        console.log(res)
        if (res.ok) {
            setPerPage(data.slice(0, limit))
            setGetProducts(data)
        }
        else {
            alert(data)
        }

    }

    const SubmitHandler = async (event) => {
        event.preventDefault()
        const jwt = Cookies.get("jwt_token")
        // console.log({...productsData,imgUrl:img},productId.current)

        const productDetails = { ...productsData, img }
        const res = await fetch(`${Api}/Shopinity/vendor/update-product/${productId.current}`, {
            method: "POST",
            headers: {
                "authorization": `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productDetails)
        })
        const data = await res.json()
        if (res.ok) {
            setPerPage(data.slice(0, limit))
            setGetProducts(data)
            setIsUpdate(false)
        }
        else {
            alert(data)
        }
        
    }



    return (<>
        <div className='vendor-page-container'>

            <Navbar />
            <div className='sidebar-form-container'>
                <Sidebar />

                {isUpdate ?
                    <form className='add-product-form' onSubmit={SubmitHandler}>
                        <h2>Add Products</h2>
                        <div className='input-container'>
                            <label className='add-product-label' htmlFor='title'>Title</label>
                            <input className='input-container-input' name='title' value={productsData.title} onChange={onChangeHandle} type='text' id='title' placeholder='Title' />
                        </div>
                        <div className='input-container'>
                            <label className='add-product-label' htmlFor='brand'>Brand</label>
                            <input className='input-container-input' name='brand' value={productsData.brand} onChange={onChangeHandle} type='text' id='brand' placeholder='Brand' />
                        </div>
                        <div className='input-container'>
                            <label className='add-product-label'>Category</label>
                            <div className='category-container'>

                                <div >
                                    <input className='single-category-container-input' name='category' value="Clothing" onChange={onChangeHandle} type='radio' id='clothing' />
                                    <label htmlFor='clothing'>Clothing</label>
                                </div>
                                <div >
                                    <input className='single-category-container-input' name='category' value="Electronics" onChange={onChangeHandle} type='radio' id='electronics' />
                                    <label htmlFor='electronics'>Electronics</label>
                                </div>
                                <div >
                                    <input className='single-category-container-input' name='category' value="Appliances" onChange={onChangeHandle} type='radio' id='appliances' />
                                    <label htmlFor='appliances'>Appliances</label>
                                </div>
                                <div >
                                    <input className='single-category-container-input' name='category' value="Grocery" onChange={onChangeHandle} type='radio' id='grocery' />
                                    <label htmlFor='grocery'>Grocery</label>
                                </div>
                                <div >
                                    <input className='single-category-container-input' name='category' value="Toys" onChange={onChangeHandle} type='radio' id='toys' />
                                    <label htmlFor='toys'>Toys</label>
                                </div>
                            </div>
                        </div>

                        <div className='input-container'>
                            <label className='add-product-label' htmlFor='price'>Price</label>
                            <input className='input-container-input' name='price' value={productsData.price} onChange={onChangeHandle} type='text' id='price' placeholder='Price' />
                        </div>
                        <div className='input-container'>
                            <label className='add-product-label' htmlFor='description'>Description</label>
                            <input className='input-container-input' name='description' value={productsData.description} onChange={onChangeHandle} type='text' id='description' placeholder='Description' />
                        </div>
                        <div className='input-container'>
                            <label className='add-product-label' htmlFor='rating'>Rating</label>
                            <input className='input-container-input' name='rating' value={productsData.rating} onChange={onChangeHandle} type='text' id='rating' placeholder='Rating' />
                        </div>
                        <div className='input-container '>
                            <label className='add-product-label ' htmlFor='imgUrl'>ImgUrl</label>
                            <input className='input-container-input add-product-img-input' name='file' onChange={onChangeImage} type='file' id='ImgUrl' placeholder='ImgUrl' />
                        </div>
                        <button type='submit'>Update</button>
                    </form>
                    :
                    <div className='my-product-contianer'>
                        <h1>
                            Products
                        </h1>
                        {isLoading ?
                            (<>
                                <div className='get-product-loading'>

                                    <BallTriangle
                                        height={100}
                                        width={100}
                                        radius={5}
                                        color="#4fa94d"
                                        ariaLabel="ball-triangle-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                    />
                                </div>
                            </>)
                            :
                            (<>
                                {perpage.map((each) => {
                                    return (
                                        <div className='get-products-container' key={each._id}>
                                            <img className='get-products-img' src={`${each.imgUrl}`} alt='img' />
                                            <div className='get-products-data-container'>
                                                <div >
                                                    <p className='get-products-title' >Title:{each.title}</p>
                                                    <p className='get-products-data'>category:{each.category}</p>
                                                    <p className='get-products-data'>price:{each.price}</p>
                                                </div>
                                                <button onClick={() => {
                                                    setProductsData({
                                                        title: each.title,
                                                        brand: each.brand,
                                                        description: each.description,
                                                        category: '',
                                                        price: each.price,
                                                        rating: each.rating

                                                    })
                                                    productId.current = each._id
                                                    setIsUpdate(true)

                                                }} className='get-products-delete-btn'>
                                                    Update

                                                </button> <br />
                                                <button onClick={() => (onClickDelete(each._id))} className='get-products-delete-btn'>
                                                    Delete

                                                </button>
                                            </div>
                                        </div>
                                    )

                                })}
                                <Pagination getProducts={getProducts} limit={limit} pageHandler={pageHandler} currentPage={currentPage} />
                            </>)
                        }
                    </div>}
            </div>

        </div>

    </>
    )
}

export default GetProducts