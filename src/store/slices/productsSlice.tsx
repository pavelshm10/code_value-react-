import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
  name: 'products',
  initialState:{
    products: [],
    product_detail: {},
  },
  reducers: {
    products: (state, action) => {
      state.products = action.payload
    },
    product_detail: (state, action) => {
        state.product_detail = action.payload
    },
  },
})

export const productDetail = (state:any) => state.products.product_detail
export const productsData = (state:any) => state.products.products


export const { product_detail, products } = productsSlice.actions

export default productsSlice.reducer