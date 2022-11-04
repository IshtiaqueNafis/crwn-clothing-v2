import React, {useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {categorySelector, retrieveCategoryMap} from "../../redux/reducer/categorySliceReducer";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
    const {loading} = useSelector(state => state.categories);
    const categories = useSelector(categorySelector.selectEntities)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(retrieveCategoryMap({category: "All"}))
    }, [dispatch])

    console.log(categories)
    return (
        <>
            {!loading && (
                Object.keys(categories).map(title => {

                   const products = categories[title].categoryItems;
                    return <CategoryPreview key={title} products={products} title={title}/>
                })


            )}
<h1>hi</h1>
        </>
    );
};

export default CategoriesPreview;
