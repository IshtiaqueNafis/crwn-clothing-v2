import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {
    createAuthUserWithEmailAndPassword,
    db,
    retriveDocumentFromDatabase,
    signInAuthWithEmailAndPassword,
    signOutUser,
    user
} from "../../utlis/firebase/firebase.utils";
import {doc, setDoc} from "firebase/firestore";
import {registerParams, signInparams, userInfo} from "../../entity/models";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;

interface userState {
    currentUser: null | userInfo;
    loading: boolean;
    error: null | string;
}


export const signInUser = createAsyncThunk<userInfo, signInparams>(
    "userSlice/signInUser",
    // @ts-ignore
    async ({email, password}, thunkApi) => {
        try {
            await signInAuthWithEmailAndPassword(email, password);
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    });


export const signOutUserAsync = createAsyncThunk<void>(
    "userSlice/signOutUser/",
    async (_, thunkApi) => {
        try {
            await signOutUser();
        } catch (e) {
            return thunkApi.rejectWithValue(e.message)
        }
    }
)

export const registerUser = createAsyncThunk<void, registerParams>(
    'userSlice/registerUser',
    async ({email, password = "", displayName = ""}, thunkApi) => {

        try {

            // @ts-ignore
            const res: UserCredential = await createAuthUserWithEmailAndPassword(email, password)

            if (!res) {
                thunkApi.rejectWithValue("email already taken")
            }
            const createdAt = new Date();
            await setDoc(doc(db, "users", res!.user!.uid), {
                email,
                displayName,
                createdAt
            })

        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const setUser = createAsyncThunk<userInfo, string>(
    "userslice/setUser",
// @ts-ignore
    async (uid, thunkApi) => {


        try {
            return await retriveDocumentFromDatabase(uid) as userInfo;
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
        initialState: <userState>({currentUser: null, loading: false, error: null}),
        reducers: {},
        extraReducers: builder => {


            builder.addCase(signOutUserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.currentUser = null;
            });
            builder.addCase(setUser.fulfilled, (state, action) => {
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


