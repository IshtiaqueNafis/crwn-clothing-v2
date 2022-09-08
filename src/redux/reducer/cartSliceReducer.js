import {createSlice} from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cartSliceReducer",
    initialState: {
        isCartOpen: false,
        cartItems: [],
        cartCount: 0,
        cartTotal: 0,


    },
    reducers: {
        setCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;

        },
        addCartItem: (state, {payload: {product}}) => {

            const existingCartItem = state.cartItems.find((cartItem) => (
                    cartItem.id === product.id
                )
            );

            if (existingCartItem) {

                state.cartItems = state.cartItems.map(cartItem => cartItem.id === product.id ? {
                        ...cartItem, quantity: cartItem.quantity + 1
                    } : cartItem
                );


            } else {

                state.cartItems = [...state.cartItems, {...product, quantity: 1}];
            }
            state.cartCount = state.cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
            state.cartTotal = state.cartItems.map(cart => (cart.price * cart.quantity)).reduce((result, item) => result + item, 0);

        },
        updateCartCount: (state) => {
            state.cartCount = state.cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        },

    }
})

export const cartReducer = cartSlice.reducer;
export const {setCartOpen, addCartItem, updateCartCount} = cartSlice.actions;