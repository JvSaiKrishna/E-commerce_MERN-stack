import React, { useState, useEffect } from 'react'
import Cookies from "js-cookie"
import ProductCard from '../ProductCards/productCard'
import "./primeProducts.css"

const apiStatues = {
    initial: "INITIAL",
    success: "SUCCESS",
    failure: "FAILURE",
    inProcess: "IN_PROCESS"
}

export default function PrimeProducts() {
    const [primeDeals, setprimeDeals] = useState([])
    const [statues, setstatues] = useState(apiStatues.initial)
    

    useEffect(() => {
        FetchPrimeDeals()
    }, [])

    const FetchPrimeDeals = async () => {
        setstatues(apiStatues.inProcess)
        const jwToken = Cookies.get("jwToken")
        const url = 'https://apis.ccbp.in/prime-deals'
        const options = {
            headers: {
                Authorization: `Bearer ${jwToken}`,
            },
            method: 'GET',
        }
        const response = await fetch(url, options)
        if (response.ok === true) {
            const fetchedData = await response.json()
            const updatedData = fetchedData.prime_deals.map(product => ({
                title: product.title,
                brand: product.brand,
                price: product.price,
                id: product.id,
                imageUrl: product.image_url,
                rating: product.rating,
            }))
            setprimeDeals(updatedData)
            setstatues(apiStatues.success)

        }
        if (response.status === 401) {
            setstatues(apiStatues.failure)
        }



    }

    const renderPrimeDealsList = () => {
        
        return (
            <div>
                <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
                <ul className="products-list">
                    {primeDeals.map(product => (
                        <ProductCard productData={product} key={product.id} />
                    ))}
                </ul>
            </div>
        )
    }
    const renderPrimeDealsFailureView = () => (
        <img
            src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
            alt="Register Prime"
            className="register-prime-image"
        />
    )
    const renderLoadingView = () => (
        <p>loading...</p>
      )

    switch (statues) {
        case apiStatues.success:
            return renderPrimeDealsList()
        case apiStatues.failure:
            return renderPrimeDealsFailureView()
        case apiStatues.inProcess:
            return renderLoadingView()
        default:
            return null     

    }
}
