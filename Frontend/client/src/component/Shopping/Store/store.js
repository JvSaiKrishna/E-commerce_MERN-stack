import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "../CartSlice/CartSlice.js"

export const store = configureStore({
    reducer:{
        cartCounter:cartReducer
    }
})