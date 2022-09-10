import React, {useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {retrieveCategoryMap} from "../../redux/reducer/categorySliceReducer";
import CategoryPreview from "../../components/category-preview/category-preview.component";
const CategoriesPreview = () => {
    const {categoriesMap, loading} = useSelector(state => state.categories);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(retrieveCategoryMap({category:""}))
    }, [dispatch])

    return (
        <>
            {!loading && (
                Object.keys(categoriesMap).map(title => {
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} products={products} title={title}/>
                })


            )}

        </>
    );
};

export default CategoriesPreview;
