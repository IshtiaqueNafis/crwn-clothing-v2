import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {SHOP_DATA} from "../../data";

export const retrieveCategoryMap = createAsyncThunk(
    'category/retriveCategory',
    async ({category = "All"}, thunkApi) => {
        try {
            console.log({category})
            let data = SHOP_DATA
            if (category !== "All") {
                console.log(category.charAt(0).toUpperCase() + category.slice(1))
                data = SHOP_DATA.filter(d => d.title === category.charAt(0).toUpperCase() + category.slice(1));
            }
            return data;


        } catch (e) {
            thunkApi.rejectWithValue(e.message);
        }
    }
)


const categoryAdapter = createEntityAdapter({
    selectId: category => category.title


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
            console.log({payload})
            const data = payload.map(p => ({title: p.title,categoryItems:p.items}));
            categoryAdapter.setAll(state, data)


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

