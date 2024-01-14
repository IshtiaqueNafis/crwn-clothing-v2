import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {categorySelector, retrieveCategoryMap} from "../../redux/reducer/categorySliceReducer";
import ProductCard from "../../components/product-card/product-card.componenet";
import "./category.styles.scss"
import {useAppDispatch, useAppSelector} from "../../redux/store/store";



const Category = () => {
    const {category} = useParams<{ category: string  }>()

    const dispatch = useAppDispatch();

    const {loading} = useAppSelector(state => state.categories);
    // @ts-ignore
    const categoryParams = category?.charAt(0).toUpperCase() + category?.slice(1);
    const categoryProduct = useAppSelector(state => categorySelector.selectById(state, categoryParams));


    useEffect(() => {

        if (!categoryProduct) {

            // @ts-ignore
            dispatch(retrieveCategoryMap(category))
        }

    }, [dispatch, category, categoryProduct])

    if (loading) return <div>loading</div>

    return (

        <>
            <h2 className={"category-title"}>{category?.toUpperCase()}</h2>
            <div className={'category-container'}>

                {categoryProduct?.items?.map(product => (
                    <ProductCard key={product.id} product={product}/>
                ))}

            </div>

        </>


    )
};

export default Category;
