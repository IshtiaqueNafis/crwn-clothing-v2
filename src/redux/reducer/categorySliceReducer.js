import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {getCategoriesAndDocuments} from "../../utlis/firebase/firebase.utils";

export const retrieveCategoryMap = createAsyncThunk(
    'category/retriveCategory',
    async ({category = "All"}, thunkApi) => {
        try {

            const data= await getCategoriesAndDocuments(category);
            console.log({data})
            return data;


        } catch (e) {
            thunkApi.rejectWithValue(e.message);
        }
    }
)



const categoryAdapter = createEntityAdapter({
    selectId: category => category.id




})




export const categorySlice = createSlice({
    name: "categories",
    initialState: categoryAdapter.getInitialState({
        loading: false,
        error: null,
        products: {},
        categoriesMap: {}

    }),
    reducers: {},
    extraReducers: builder => {
        builder.addCase(retrieveCategoryMap.fulfilled, (state, {payload}) => {

            state.loading = false;
            state.error = null;

            categoryAdapter.setAll(state,payload)


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

