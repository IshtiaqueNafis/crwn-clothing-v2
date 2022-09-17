import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {
    createAuthUserWithEmailAndPassword,
    db,
    retriveDocumentFromDatabase,
    signInAuthWithEmailAndPassword,
    signOutUser, user
} from "../../utlis/firebase/firebase.utils";
import {doc, setDoc} from "firebase/firestore";


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
    async ({email, password="", displayName = ""}, thunkApi) => {

        try {

            const res = await createAuthUserWithEmailAndPassword(email, password);

            if (!res) {
                thunkApi.rejectWithValue("email already taken")
            }
            const createdAt = new Date();
            await setDoc(doc(db, "users", res.user.uid), {
                email,
                displayName,
                createdAt
            })

        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const setUser = createAsyncThunk(
    "userslice/setUser",
    async ({uid}, thunkApi) => {


        try {
            return await retriveDocumentFromDatabase(uid);
        } catch (e) {

        }

    }, {
        condition: () => {
            if (!user) {
                return;
            }
        }
    }
)


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
            builder.addCase(setUser.fulfilled,(state,action)=>{
                state.loading = false;
                state.currentUser = action.payload;
                state.error = null;
            })
            builder.addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            builder.addCase(signInUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
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


