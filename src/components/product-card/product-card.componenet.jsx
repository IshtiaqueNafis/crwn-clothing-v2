import React from 'react';
import "./product-card.styles.scss"
import Button from "../button/button.component";
import {useDispatch} from "react-redux";
import {addCartItem} from "../../redux/reducer/cartSliceReducer";

const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const {imageUrl, name, price} = product;
    return (
        <div className={"product-card-container"}>
            <img src={imageUrl} alt={name}/>
            <div className={'footer'}>
                <span className={'name'}>{name} </span>
                <span className={'price'}>${price} </span>
            </div>
            <Button buttonType='inverted' onClick={() => dispatch(addCartItem({product}))}>Add To Card</Button>
        </div>
    );
};

export default ProductCard;
