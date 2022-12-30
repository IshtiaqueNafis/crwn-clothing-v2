import React from 'react';
import "./checkout-item.styles.scss"
import {addCartItem} from "../../redux/reducer/cartSliceReducer";
import {useAppDispatch} from "../../redux/store/store";
import {products} from "../../entity/models";

interface props{
    product:products
}

const CheckoutItem = ({product}:props) => {

    const dispatch = useAppDispatch();
    return (
        <div className={'checkout-item-container'}>
            <div className={'image-container'}>
                <img src={product!.imageUrl} alt={product!.name}/>
            </div>
            <span className={'name'}>{product!.name}</span>
            <span className={'quantity'}>
                 <div className={'arrow'} onClick={() => dispatch(addCartItem({product:product, quantity: -1}))}>
                &#10094;
            </div>
            <span className={'value'}>{product!.quantity}</span>
            <div className={'arrow'} onClick={() => dispatch(addCartItem({product: product, quantity: 1}))}>
                &#10095;
            </div>
            </span>

            <span className={'price'}>{product!.price}</span>
            <div className={'remove-button'} onClick={() => dispatch(addCartItem({product: product, quantity: 0}))}>
                &#10005;
            </div>
        </div>
    );
};

export default CheckoutItem;
