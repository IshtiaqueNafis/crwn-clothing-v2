import React from 'react';
import {useForm} from "react-hook-form";
import FormInput from "../form-input/form-input.component";
import {yupResolver} from "@hookform/resolvers/yup";
import {signInDefaultValue, signInSchema} from "../../utlis/form/formData";
import Button from "../button/button.component";
import {signInWithGooglePopup} from "../../utlis/firebase/firebase.utils";
import {useDispatch} from "react-redux";
import {signInUser} from "../../redux/reducer/userSliceReducer";
import "./sign-in.styles.scss"

const SignInForm = () => {
    const dispatch = useDispatch()
    const {handleSubmit, control} = useForm({
        mode: "all",
        resolver: yupResolver(signInSchema),

    });

    const signInWithGoogle = async () => {
       await signInWithGooglePopup();
    };


    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit(({email, password}) => dispatch(signInUser({email, password})))}>
                <FormInput
                    inputOptions={{
                        type: 'text',
                        name: "email",
                        label: "Enter Email",
                        defaultValue: signInDefaultValue.email,
                        control
                    }}

                />
                <FormInput
                    inputOptions={{
                        type: 'password',
                        name: "password",
                        label: "Enter Password",
                        defaultValue: signInDefaultValue.password,
                        control
                    }}

                />
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button buttonType='google' type='button' onClick={signInWithGoogle}>
                        Sign In With Google
                    </Button>
                </div>

            </form>


        </div>
    );
};

export default SignInForm;
