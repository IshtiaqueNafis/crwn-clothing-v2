import React from 'react';
import "./cart-item.styles.scss"
import {products} from "../../entity/models";


interface cartItemProps{
    cartItem:products
}


const CartItem = ( {cartItem: {imageUrl, name, price, quantity}}:cartItemProps) => {
    return (
        <div className={'cart-item-container'}>
            <img src={imageUrl} alt={`${name}`}/>
            <div className={'item-details'}>
                <span className={'name'}>{name}</span>
                <span className={'price'}>{quantity} X ${price}</span>
            </div>
        </div>
    );
};

export default CartItem;
