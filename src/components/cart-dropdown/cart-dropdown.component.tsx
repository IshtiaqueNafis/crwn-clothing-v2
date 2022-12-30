import React from 'react';
import Button from "../button/button.component";
import {useNavigate} from "react-router-dom";
import CartItem from "../cart-item/cart-item.component";
import {selectAllCartProducts} from "../../redux/reducer/cartSliceReducer";
import "./cart-dropdown.styles.scss"
import {useAppSelector} from "../../redux/store/store";


const CartDropDown = () => {

    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate("/checkout");
    }
    const cartItems = useAppSelector(selectAllCartProducts);

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.length ? (
                    cartItems?.map((cartItem) => (
                        <CartItem key={cartItem?.id} cartItem={cartItem}/>
                    ))
                ) : (
                    <span className='empty-message'>Your cart is empty</span>
                )}
            </div>
            <Button onClick={goToCheckoutHandler} buttonType={"inverted"}>GO TO CHECKOUT</Button>
        </div>
    );
};

export default CartDropDown;
