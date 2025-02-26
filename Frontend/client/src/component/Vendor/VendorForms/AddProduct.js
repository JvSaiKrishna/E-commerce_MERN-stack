import React, { useState } from 'react'
import Cookies from "js-cookie"
import { Navigate } from 'react-router-dom'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import { Api } from '../../Api'


const AddProduct = () => {
    const [productsData, setProductsData] = useState({
        title: '',
        brand: '',
        description: '',
        category: '',
        price: '',
        rating: ''
    })
    const [img, setimg] = useState(null)
    // const [msg, setMsg] = useState('')


    const jwt = Cookies.get("jwt_token")
    // console.log(jwt)
    if (!jwt) {
        return <Navigate to="/Shopinity/vendor/login" replace />
    }

    const onChangeHandle = (event) => {
        setProductsData((prev) => {
            return { ...prev, [event.target.name]: event.target.value }
        })
    }

    // const onChangeCategory = (event)=>{
    //     setProductsData((prev)=>{
    //         return {...prev,category:event.target.value}
    //     })
    // }
    const onChangeImage = (event) => {
        // console.log(event.target.files)
        setimg(event.target.files[0])
    }

    const SubmitHandler = async (event) => {
        event.preventDefault()
        const jwt = Cookies.get("jwt_token")
        // console.log(productsData.category)
        const formData = new FormData()
        formData.append("title", productsData.title)
        formData.append("description", productsData.description)
        formData.append("brand", productsData.brand)
        formData.append("category", productsData.category)
        formData.append("price", productsData.price)
        formData.append("rating", productsData.rating)
        formData.append("file", img);
        //  console.log(formData.get("file"))
        //  console.log(formData.get("rating"))
        const res = await fetch(`${Api}/Shopinity/vendor/add-product`, {
            method: "POST",
            headers: {
                "authorization": `Bearer ${jwt}`
            },
            body: formData
        })
        const data = await res.json()
        if (res.ok) {
            alert(data)
        }
        else {
            alert(data)
        }
        setProductsData((prev) => {
            return {
                ...prev,
                title: '',
                brand: '',
                description: '',
                price: '',
                rating: ''
            }
        })






    }
    // console.log(productsData)
    return (
        <>
            <div className='vendor-page-container'>

                <Navbar />
                <div className='sidebar-form-container'>
                    <Sidebar />

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
                            <input className='input-container-input add-product-img-input'  name='file' onChange={onChangeImage} type='file' id='ImgUrl' placeholder='ImgUrl' />
                        </div>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddProduct