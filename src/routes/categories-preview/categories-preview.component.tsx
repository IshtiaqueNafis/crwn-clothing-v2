import React, {useEffect} from 'react';
import {categorySelector, retrieveCategoryMap} from "../../redux/reducer/categorySliceReducer";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import {useAppDispatch, useAppSelector} from "../../redux/store/store";

const CategoriesPreview = () => {
    const {loading} = useAppSelector(state => state.categories);
    const categories = useAppSelector(categorySelector.selectEntities)

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(retrieveCategoryMap("All"))
    }, [dispatch])


    return (
        <>
            {!loading && (
                Object.keys(categories).map(title => {

                   const products = categories[title]?.items
                    return <CategoryPreview
                        key={title} items={products} title={title}/>
                })


            )}
<h1>hi</h1>
        </>
    );
};

export default CategoriesPreview;
