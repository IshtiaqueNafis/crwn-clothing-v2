import React from 'react';
import "./cart-item.styles.scss"

const CartItem = ({cartItem: {imageUrl, name, price, quantity}}) => {
    return (
        <div className={'cart-icon-container'}>
            <img src={imageUrl} alt={`${name}`}/>
            <div className={'item-details'}>
                <span className={'name'}>{name}</span>
                <span className={'price'}>{quantity} X ${price}</span>
            </div>
        </div>
    );
};

export default CartItem;
