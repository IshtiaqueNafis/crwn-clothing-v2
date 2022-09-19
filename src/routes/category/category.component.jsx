import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {categorySelector, retrieveCategoryMap} from "../../redux/reducer/categorySliceReducer";
import ProductCard from "../../components/product-card/product-card.componenet";
import "./category.styles.scss"

const Category = () => {
    const {category} = useParams();
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.categories);
    console.log({category})
    const categoryProduct = useSelector(state => categorySelector.selectById(state, category));
    console.log({categoryProduct})

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

                    {categoryProduct?.data.map(product=>(
                        <ProductCard key={product.id} product={product}/>
                    ))}

                </div>

        </>



    )
};

export default Category;
