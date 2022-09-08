import * as yup from "yup";

export const signInSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
});

export const signInDefaultValue = {
    email: "",
    password: ""
};

export const signUpSchema =yup.object().shape( {
    displayName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
    confirmPassword: yup.string().min(8).max(32).required(),
});

export const signUpDefaultValue = {

    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}