import {configureStore} from '@reduxjs/toolkit'
import {userReducer} from "../reducer/userSliceReducer";
import {logger} from "redux-logger/src";
import {produceReducer} from "../reducer/productSliceReducer";
import {cartReducer} from "../reducer/cartSliceReducer";

export const store = configureStore({
    reducer: {
        userState: userReducer,
        productState: produceReducer,
        cartState: cartReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})