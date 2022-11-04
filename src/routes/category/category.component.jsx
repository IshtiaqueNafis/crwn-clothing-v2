import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {categorySelector, retrieveCategoryMap} from "../../redux/reducer/categorySliceReducer";
import ProductCard from "../../components/product-card/product-card.componenet";
import "./category.styles.scss"

const Category = () => {
    const {category} = useParams();
    console.log({category})
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.categories);
    const categoryParams = category.charAt(0).toUpperCase() + category.slice(1);
    const categoryProduct = useSelector(state => categorySelector.selectById(state, categoryParams));


    useEffect(() => {
        
        if(!categoryProduct) {

        dispatch(retrieveCategoryMap({category}))
        }

    }, [dispatch, category, categoryProduct])

    if (loading) return <div>loading</div>

    return (

                <>
                <h2 className={"category-title"}>{category.toUpperCase()}</h2>
                <div className={'category-container'}>

                    {categoryProduct?.categoryItems.map(product=>(
                        <ProductCard key={product.id} product={product}/>
                    ))}

                </div>

        </>



    )
};

export default Category;
