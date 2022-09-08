import {createSlice} from "@reduxjs/toolkit";
import {SHOP_DATA} from "../../data";
import PRODUCTS from '../../shop-data.json'
export const productSlice = createSlice({
    name:"productSlice",
    initialState:{
        products: PRODUCTS

    },
    reducers: {},
    extraReducers:{}
})
export const produceReducer = productSlice.reducer;