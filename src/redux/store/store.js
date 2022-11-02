import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {userReducer} from "../reducer/userSliceReducer";
import {logger} from "redux-logger/src";
import {categoryReducer} from "../reducer/categorySliceReducer";
import {cartReducer} from "../reducer/cartSliceReducer";
import storage from 'redux-persist/lib/storage';
import {persistReducer} from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ["userState"]
}
const reducers = combineReducers({
    userState: userReducer,
    categories: categoryReducer,
    carts: cartReducer
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger)
})