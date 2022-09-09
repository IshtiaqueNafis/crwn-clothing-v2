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
        addCartItem: (state, {payload: {product, quantity = 1}}) => {

            const existingCartItemIndex = state.cartItems.findIndex((cartItem) => (
                    cartItem.id === product.id
                )
            );

            if (existingCartItemIndex !== -1) {

                if (quantity === -1) {
                    state.cartItems = state.cartItems.map(cartItem => cartItem.id === product.id ? {
                            ...cartItem, quantity: cartItem.quantity - 1
                        } : cartItem
                    ).map(cart => cart.quantity <= 0 ? {} : {...cart})
                        .filter(element => {
                                return Object.keys(element).length !== 0;
                            }
                        )


                } else if (quantity === 0) {
                    state.cartItems = state.cartItems.filter(cart => cart.id !== product.id);
                } else {
                    state.cartItems = state.cartItems.map(cartItem => cartItem.id === product.id ? {
                            ...cartItem, quantity: cartItem.quantity + 1
                        } : cartItem
                    );
                }

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