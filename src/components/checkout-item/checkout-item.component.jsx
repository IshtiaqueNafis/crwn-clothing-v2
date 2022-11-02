import React from 'react';
import "./checkout-item.styles.scss"
import {useDispatch} from "react-redux";
import {addCartItem} from "../../redux/reducer/cartSliceReducer";

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem
    const dispatch = useDispatch();
    return (
        <div className={'checkout-item-container'}>
            <div className={'image-container'}>
                <img src={imageUrl} alt={name}/>
            </div>
            <span className={'name'}>{name}</span>
            <span className={'quantity'}>
                 <div className={'arrow'} onClick={() => dispatch(addCartItem({product: cartItem, quantity: -1}))}>
                &#10094;
            </div>
            <span className={'value'}>{quantity}</span>
            <div className={'arrow'} onClick={() => dispatch(addCartItem({product: cartItem, quantity: 1}))}>
                &#10095;
            </div>
            </span>

            <span className={'price'}>{price}</span>
            <div className={'remove-button'} onClick={() => dispatch(addCartItem({product: cartItem, quantity: 0}))}  >
                &#10005;
            </div>
        </div>
    );
};

export default CheckoutItem;
