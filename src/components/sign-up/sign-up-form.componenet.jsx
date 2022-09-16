import React from 'react';
import FormInput from "../form-input/form-input.component";
import "./sign-up.styles.scss"
import Button from "../button/button.component";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {signUpDefaultValue, signUpSchema} from "../../utlis/form/formData";
import {useDispatch} from "react-redux";
import {registerUser} from "../../redux/reducer/userSliceReducer";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm = () => {
    const dispatch = useDispatch();
    const {handleSubmit, control, reset} = useForm({
        resolver: yupResolver(signUpSchema),

    })

    const submitForm = async ({email, password, displayName}) => {

        try {
            dispatch(registerUser({email, password, displayName}))
        }catch (e) {
            console.log(e)
        }


    }

    return (
        <div className={'sign-up-container'}>
            <h2>Don't have an account?</h2>
            <span>sign up with your email and password</span>
            <form onSubmit={handleSubmit(submitForm)}>

                <FormInput
                    inputOptions={{
                        type: 'text',
                        name: "displayName",
                        label: "Enter DisplayName",
                        defaultValue: signUpDefaultValue.displayName,
                        control
                    }}
                />

                <FormInput
                    inputOptions={{
                        type: 'text',
                        name: "email",
                        label: "Enter Email",
                        defaultValue: signUpDefaultValue.email,
                        control
                    }}
                />

                <FormInput
                    inputOptions={{
                        type: 'password',
                        name: "password",
                        label: "Enter Password",
                        defaultValue: signUpDefaultValue.password,
                        control
                    }}
                />


                <FormInput
                    inputOptions={{
                        type: 'password',
                        name: "confirmPassword",
                        label: "Reconfirm Password",
                        defaultValue: signUpDefaultValue.confirmPassword,
                        control
                    }}
                />

                <Button type={'submit'}>Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;
