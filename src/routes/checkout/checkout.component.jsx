import React from 'react';
import {useSelector} from "react-redux";

const CheckOut = () => {
    const {cartItems} = useSelector(state => state.cartState);

    return (
        <div>
            {cartItems.map(cart => (
                <div key={cart.id}>
                    <h1>{cart.name}</h1>
                    <h2>{cart.price}</h2>
                    <h2>{cart.quantity}</h2>
                </div>


            ))}
        </div>
    );
};

export default CheckOut;
