import React from 'react';
import ProductCard from "../../components/product-card/product-card.componenet";
import "./shop.styles.scss"
import {useSelector} from "react-redux";

const Shop = () => {
    const {products} = useSelector(state => state.productState);

    return (
        <div className={'products-container'}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    );
};

export default Shop;
