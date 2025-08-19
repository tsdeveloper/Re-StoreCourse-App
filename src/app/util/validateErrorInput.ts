import * as yup from "yup";

export const formLoginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
})

export const formRegisterSchema = yup.object().shape({
        username: yup.string().required('Username is required').test('isUserNamePattern', ()=> {
       return 'Username need max length 15 and min length 6'
    }, (value ) => {
        return /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/i.test(value);
    }),
    password: yup.string().required('Password is required').test('isPasswordValidatePattern', ()=> {
        return 'Password need max length 15 and min length 4'
    }, (value ) => {
        return /(?=^.{4,15}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/i.test(value);
    }),
    email: yup.string().required('Email is required').test('isPasswordValidatePattern', ()=> {
        return 'Not a valid email address'
    }, (value ) => {
        return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i.test(value);
    }),
})