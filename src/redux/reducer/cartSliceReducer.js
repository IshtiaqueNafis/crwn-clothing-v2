import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";

export const cartAdapter = createEntityAdapter({
        selectId: cart => cart.id
    }
)
export const {
    selectById: selectCartProductById,
    selectIds: selectAlCartProductsIds,
    selectEntities: selectAllCartProductEntities,
    selectAll: selectAllCartProducts,
    selectTotal: selectTotalCartProducts
} = cartAdapter.getSelectors(state => state.carts);
export const cartSlice = createSlice({
    name: "carts",
    initialState: cartAdapter.getInitialState({
        isCartOpen: false,
        cartItems: [],
        cartCount: 0,
        cartTotal: 0,
    }),

    reducers: {
        setCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;

        },


        addCartItem: (state, action) => {

            const {product, quantity} = action.payload;
            const productExists = cartAdapter.getSelectors().selectById(state, product.id);
            if (!productExists) {
                cartAdapter.addOne(state, {...product, quantity});
            } else {
                if (productExists) {
                    if (productExists.quantity >= 1 && quantity === 1) {
                        cartAdapter.updateOne(state, {id: product.id, changes: {quantity: productExists.quantity + 1}})
                    } else if (productExists.quantity >= 1 && quantity === -1) {
                        cartAdapter.updateOne(state, {id: product.id, changes: {quantity: productExists.quantity - 1}})
                    } else {
                        cartAdapter.removeOne(state, product.id);
                    }
                }
            }

            const allCartItems = cartAdapter.getSelectors().selectAll(state);
            state.cartTotal = allCartItems.map(cart => (cart.price * cart.quantity)).reduce((result, item) => result + item, 0);
            state.cartCount = allCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);


        },
        updateCartCount: (state) => {
            state.cartCount = state.cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        },

    }
})

export const cartReducer = cartSlice.reducer;

export const {setCartOpen, addCartItem} = cartSlice.actions;





