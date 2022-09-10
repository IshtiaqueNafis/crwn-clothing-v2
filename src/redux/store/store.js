import {configureStore} from '@reduxjs/toolkit'
import {userReducer} from "../reducer/userSliceReducer";
import {logger} from "redux-logger/src";
import {categoryReducer} from "../reducer/categorySliceReducer";
import {cartReducer} from "../reducer/cartSliceReducer";

export const store = configureStore({
    reducer: {
        userState: userReducer,
        categories: categoryReducer,
        cartState: cartReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})