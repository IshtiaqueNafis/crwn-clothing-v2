import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {categories} from "../../entity/models";
import {RootState} from "../store/store";
import {getCategoriesAndDocuments} from "../../utlis/firebase/firebase.utils";



export const retrieveCategoryMap = createAsyncThunk<categories[], string>(
    'category/retrieveCategory',
// @ts-ignore
    async (title:string, thunkApi) => {
        try {
            const data = await getCategoriesAndDocuments();
            console.log({data})
            return await getCategoriesAndDocuments(title) as categories[];
        } catch (e: any) {
            thunkApi.rejectWithValue(e.message);
        }
    }
)


const categoryAdapter = createEntityAdapter<categories>({
    selectId: category => category.title


})


export const categorySlice = createSlice({
    name: "categories",
    initialState: categoryAdapter.getInitialState({
        loading: false,
        error: "",
        products: {},
        categoriesMap: {}

    }),
    reducers: {},
    extraReducers: builder => {
        builder.addCase(retrieveCategoryMap.fulfilled, (state, {payload}) => {


            state.loading = false;

            categoryAdapter.setAll(state, payload)


        });
        builder.addCase(retrieveCategoryMap.rejected, (state, action) => {
            state.loading = false;

        });
        builder.addCase(retrieveCategoryMap.pending, (state) => {
            state.loading = true;

        })
    }
})
export const categoryReducer = categorySlice.reducer;

export const categorySelector = categoryAdapter.getSelectors((state: RootState) => state.categories);

