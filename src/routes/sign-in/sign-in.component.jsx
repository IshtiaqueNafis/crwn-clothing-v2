import React from 'react';
import {createUserDocumentFromAuth, signInWithGooglePopup} from "../../utlis/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = createUserDocumentFromAuth(user)
        console.log({userDocRef});
    }

    return (
        <div>
            <h1>Sign In page</h1>
            <button onClick={logGoogleUser}>

            </button>
        </div>
    );
};

export default SignIn;
