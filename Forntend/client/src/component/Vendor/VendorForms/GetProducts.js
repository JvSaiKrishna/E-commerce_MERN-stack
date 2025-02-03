import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import { Navigate } from 'react-router-dom'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import Pagination from '../pagination'
import { Api } from '../../Api'
import {BallTriangle} from "react-loader-spinner"


// dotEnv.config()
// console.log(process.env.Api)
const limit = 3
// let pageNum = []

const GetProducts = () => {

    const [getProducts, setGetProducts] = useState([])
    const [perpage, setPerPage] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)





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



    return (<>
        <div className='vendor-page-container'>

            <Navbar />
            <div className='sidebar-form-container'>
                <Sidebar />

                <div className='my-product-contianer'>
                    <h1>
                        Products
                    </h1>
                    {isLoading?
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
                                <img className='get-products-img' src={`${Api}/${each.imgUrl}`} alt='img' />
                                <div className='get-products-data-container'>
                                    <div >
                                        <p className='get-products-title' >Title:{each.title}</p>
                                        <p className='get-products-data'>category:{each.category}</p>
                                        <p className='get-products-data'>price:{each.price}</p>
                                    </div>
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
                </div>
            </div>

        </div>

    </>
    )
}

export default GetProducts