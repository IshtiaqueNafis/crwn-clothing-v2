import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    signInAuthWithEmailAndPassword,
    signOutUser
} from "../../utlis/firebase/firebase.utils";


export const signInUser = createAsyncThunk(
    "userSlice/signInUser",
    async ({email, password}, thunkApi) => {
        try {
           await signInAuthWithEmailAndPassword(email, password);

        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    });


export const signOutUserAsync = createAsyncThunk(
    "userSlice/signOutUser/",
    async (_, thunkApi) => {
        try {
            await signOutUser();
        } catch (e) {
            return thunkApi.rejectWithValue(e.message)
        }
    }
)

export const registerUser = createAsyncThunk(
    'userSlice/registerUser',
    async ({email, password, displayName}, thunkApi) => {

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});

        } catch (e) {
            return thunkApi.rejectWithValue(e.message);
        }
    }
);


export const userSlice = createSlice({
        name: 'UserSlice',
        initialState: {currentUser: {}, loading: false, error: null},
        reducers: {},
        extraReducers: builder => {

            builder.addCase(signOutUserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.currentUser = null;
            });

            builder.addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            builder.addCase(signInUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.currentUser = action.payload;
            });
            builder.addMatcher(isAnyOf(signInUser.pending, registerUser.pending, signOutUserAsync.pending),
                (state, action) => {
                    state.loading = true;
                    state.error = null;
                });
            builder.addMatcher(isAnyOf(signInUser.rejected, registerUser.rejected, signOutUserAsync.rejected), (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


        }
    }
);

export const userReducer = userSlice.reducer;

