import React from 'react';
import "./cart-item.styles.scss"
import {products} from "../../entity/models";


interface cartItemProps {
    cartItem: products
}


const CartItem = ({cartItem}: cartItemProps) => {
    return (
        <div className={'cart-item-container'}>
            <img src={cartItem?.imageUrl} alt={`${cartItem?.name}`}/>
            <div className={'item-details'}>
                <span className={'name'}>{cartItem?.name}</span>
                <span className={'price'}>{cartItem?.quantity} X ${cartItem?.price}</span>
            </div>
        </div>
    );
};

export default CartItem;
