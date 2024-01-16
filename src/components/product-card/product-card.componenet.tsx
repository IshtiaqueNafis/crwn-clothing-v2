import React from 'react';
import "./product-card.styles.scss"
import Button from "../button/button.component";
import {addCartItem, selectCartProductById,} from "../../redux/reducer/cartSliceReducer";
import {useAppDispatch, useAppSelector} from "../../redux/store/store";
import {products} from "../../entity/models";

interface Props{
    product:products
}


const ProductCard = ({product}:Props) => {
    const dispatch = useAppDispatch();
    const {imageUrl, name, price} = product;
    useAppSelector(state => selectCartProductById(state, product.id));
    return (
        <div className={"product-card-container"}>
            <img src={imageUrl} alt={name}/>
            <div className={'footer'}>
                <span className={'name'}>{name} </span>
                <span className={'price'}>${price} </span>

            </div>
            <Button buttonType='inverted' onClick={() => dispatch(addCartItem({product, quantity: 1}))}>Add To
                Cart</Button>


        </div>
    );
};

export default ProductCard;
