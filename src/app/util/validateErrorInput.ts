import * as yup from "yup";

export const formLoginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
})

export const formRegisterSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    email: yup.string().required('Email is required'),
})