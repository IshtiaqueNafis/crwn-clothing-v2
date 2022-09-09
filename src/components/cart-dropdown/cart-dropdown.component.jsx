import React from 'react';
import "./cart-dropdown.styles.scss"
import Button from "../button/button.component";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import CartItem from "../cart-item/cart-item.component";


const CartDropDown = () => {
    const {cartItems} = useSelector(state => state.cartState);
    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate("/checkout");
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.length ? (
                    cartItems.map((cartItem) => (
                        <CartItem key={cartItem.id} cartItem={cartItem} />
                    ))
                ) : (
                    <span className='empty-message'>Your cart is empty</span>
                )}
            </div>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    );
};

export default CartDropDown;
