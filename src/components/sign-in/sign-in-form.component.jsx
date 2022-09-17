import React from 'react';
import {useForm} from "react-hook-form";
import FormInput from "../form-input/form-input.component";
import {yupResolver} from "@hookform/resolvers/yup";
import {signInDefaultValue, signInSchema} from "../../utlis/form/formData";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {signInWithGooglePopup} from "../../utlis/firebase/firebase.utils";
import {useDispatch} from "react-redux";
import {registerUser, signInUser} from "../../redux/reducer/userSliceReducer";

const SignInForm = () => {
    const dispatch = useDispatch()
    const {handleSubmit, control, formState: {errors}, reset} = useForm({
        mode: "all",
        resolver: yupResolver(signInSchema),

    });

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
    };


    return (
        <div>
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
                <Button type={'submit'}>Sign In</Button>

            </form>
            <Button
                buttonType={BUTTON_TYPE_CLASSES.google}
                type='button'
                onClick={signInWithGoogle}
            >
                Sign In With Google
            </Button>


        </div>
    );
};

export default SignInForm;
