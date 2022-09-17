import {createAsyncThunk, createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import {getCategoriesAndDocuments} from "../../utlis/firebase/firebase.utils";

export const retrieveCategoryMap = createAsyncThunk(
    'category/retriveCategory',
    async ({category = ""}, thunkApi) => {
        try {
            return await getCategoriesAndDocuments(category);
        } catch (e) {
            thunkApi.rejectWithValue(e.message);
        }
    }
)



const categoryAdapter = createEntityAdapter({
    selectId: category => category.key


})
const myIdExtractor = category => category.title;


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
            state.categoriesMap = action.payload;
            console.log(state.categoriesMap["hats"]);
            categoryAdapter.setAll(state, action.payload)

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