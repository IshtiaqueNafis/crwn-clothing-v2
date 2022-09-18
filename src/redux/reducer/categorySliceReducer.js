import {createAsyncThunk, createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import {getCategoriesAndDocuments} from "../../utlis/firebase/firebase.utils";

export const retrieveCategoryMap = createAsyncThunk(
    'category/retriveCategory',
    async ({category = ""}, thunkApi) => {
        try {
           const {data2}= await getCategoriesAndDocuments(category);
           const {data}= await getCategoriesAndDocuments(category);


            return {data,data2};
        } catch (e) {
            thunkApi.rejectWithValue(e.message);
        }
    }
)



const categoryAdapter = createEntityAdapter({
    selectId: category => category.categoryId




})




export const categorySlice = createSlice({
    name: "CategorySlice",
    initialState: categoryAdapter.getInitialState({
        loading: false,
        error: null,
        products: {},
        categoriesMap: {}

    }),
    reducers: {},
    extraReducers: builder => {
        builder.addCase(retrieveCategoryMap.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.categoriesMap =action.payload.data2
            categoryAdapter.setAll(state,action.payload.data)

        });
        builder.addCase(retrieveCategoryMap.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(retrieveCategoryMap.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
    }
})
export const categoryReducer = categorySlice.reducer;

export const categorySelector = categoryAdapter.getSelectors(state => state.categories);

