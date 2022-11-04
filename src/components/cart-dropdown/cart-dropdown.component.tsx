import React from 'react';
import Button from "../button/button.component";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import CartItem from "../cart-item/cart-item.component";
import {selectAllCartProducts} from "../../redux/reducer/cartSliceReducer";
import "./cart-dropdown.styles.scss"
import {products} from "../../entity/models";


const CartDropDown = () => {

    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate("/checkout");
    }
    const cartItems:products[] = useSelector(selectAllCartProducts);

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.length ? (
                    cartItems.map((cartItem) => (
                        <CartItem key={cartItem.id} cartItem={cartItem}/>
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
