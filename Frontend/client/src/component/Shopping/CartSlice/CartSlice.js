import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Api } from "../../Api"
import Cookies from "js-cookie"


const jwt = Cookies.get("jwToken")

export const FetchCartProducts = createAsyncThunk('/cart', async () => {
  try {
    const url = `${Api}/Shopinity/cart`
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      }
    }
    const res = await fetch(url, options)
    if (!res.ok) {
      const errMsg = await res.json()
      throw new Error(errMsg?.message || "Somthing went wrong")
    }
    else {
      const data = await res.json()
      return data.cartProducts
    }

  } catch (error) {
    throw error
  }

})

export const IncrementProductQuantity = createAsyncThunk("/cart/inc/:id", async ({ id, products }) => {
  try {
    const url = `${Api}/Shopinity/cart/${id}?quantity=1`
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      }

    }
    const res = await fetch(url, options)
    if (res.ok) {
      const newProducts = products.map(each => {
        if (each._id === id) {
          return { ...each, quantity: each.quantity + 1 }
        }
        return each
      })
      return newProducts

    }
    else {
      const errMsg = await res.json()
      throw new Error(errMsg?.message || "Somthing went wrong")
    }
  } catch (error) {
    throw error

  }

})
export const DecrementProductQuantity = createAsyncThunk("/cart/dec/:id", async ({ quantity, id, products }) => {
  try {
    if (quantity > 1) {
      const url = `${Api}/Shopinity/cart/${id}?quantity=-1`
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`
        }

      }
      const res = await fetch(url, options)
      if (res.ok) {
        const newProducts = products.map(each => {
          if (each._id === id) {
            return { ...each, quantity: each.quantity - 1 }
          }
          return each
        })
        return newProducts

      }
      else {
        const errMsg = await res.json()
        throw new Error(errMsg?.message || "Somthing went wrong")
      }
    }
    else {
      return products
    }
  } catch (error) {
    throw error
  }
})

export const RemoveProductFromCart = createAsyncThunk("cart/:id/delete", async (id) => {
  try {
    const url = `${Api}/Shopinity/cart/${id}`
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      }

    }
    const res = await fetch(url, options)
    if (res.ok) {
      const data = await res.json()
      return data.cartProducts
    }
    else {
      const errMsg = await res.json()
      throw new Error(errMsg?.message || "Somthing went wrong")
    }
  } catch (error) {
    throw error
  }
})

export const RemoveAllProductsFromCart = createAsyncThunk("cart/delete",async()=>{
  try {
    const url = `${Api}/Shopinity/cart`
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      }

    }

    const res = await fetch(url,options)
    if (res.ok) {
      const data = await res.json()
      return data.cartProducts
    }
    else{
      const errMsg = await res.json()
      throw new Error(errMsg?.message || "Somthing went wrong")

    }

  } catch (error) {
    throw error
    
  }
})

export const cartCount = createAsyncThunk("cart/count", async()=>{
  try {
    const url = `${Api}/Shopinity/cart/count`
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      }
    }
    const res = await fetch(url, options)
    if (!res.ok) {
      const errMsg = await res.json()
      throw new Error(errMsg?.message || "Somthing went wrong")
    }
    else {
      const data = await res.json()
      return data.count
    }

  } catch (error) {
    throw error
  }
})

const cartSlice = createSlice({
  name: "cartCounter",
  initialState: {
    loading: false,
    cartProducts: [],
    count: 0,
    errMsg: '',
    cartLoading:false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchCartProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchCartProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.cartProducts = [...action.payload]
      })
      .addCase(FetchCartProducts.rejected, (state, action) => {
        state.loading = false;
        state.errMsg = action.error.message;

      })
      .addCase(IncrementProductQuantity.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(IncrementProductQuantity.fulfilled, (state, action) => {
        state.cartLoading = false
        state.cartProducts = [...action.payload]
      })
      .addCase(IncrementProductQuantity.rejected, (state, action) => {
        state.cartLoading = false;
        state.errMsg = action.error.message;

      })
      .addCase(DecrementProductQuantity.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(DecrementProductQuantity.fulfilled, (state, action) => {
        state.cartLoading = false
        state.cartProducts = [...action.payload]
      })
      .addCase(DecrementProductQuantity.rejected, (state, action) => {
        state.cartLoading = false;
        state.errMsg = action.error.message

      })
      .addCase(RemoveProductFromCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(RemoveProductFromCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cartProducts = [...action.payload]
      })
      .addCase(RemoveProductFromCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.errMsg = action.error.message

      })
      .addCase(cartCount.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(cartCount.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.count = action.payload
      })
      .addCase(cartCount.rejected, (state, action) => {
        state.cartLoading = false;
        state.errMsg = action.error.message

      })
      .addCase(RemoveAllProductsFromCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(RemoveAllProductsFromCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        console.log(action.payload)
        state.cartProducts = []
      })
      .addCase(RemoveAllProductsFromCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.errMsg = action.error.message

      })

  }

})

export default cartSlice.reducer

