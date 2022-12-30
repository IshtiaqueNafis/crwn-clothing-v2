import React from 'react';
import "./category-preview.styles.scss"
import ProductCard from "../product-card/product-card.componenet";
import {Link} from "react-router-dom";
import {categories, products} from "../../entity/models";
interface Props{
    title:string
    items:products[] | undefined
}


const CategoryPreview = ({title,items}:Props) => {
    return (
        <div className={'category-preview-container'}>
            <h2>
    <span>
        <Link to={`${title.toLowerCase()}`}>{title.toUpperCase()}</Link>

    </span>
            </h2>
            <div className={'preview'}>
                {
                   items?.filter((_, idx) => (
                        idx < 4
                    )).map(product =>
                        <ProductCard key={product.id} product={product}/>)
                }
            </div>
        </div>
    );
};

export default CategoryPreview;
