import React, {useState} from 'react'
import './App.css'
import {InputField} from "./forms/InputField";
import styled from 'styled-components';
import {SPACING_L} from "./styles";
import {signup} from "./api/signup";
import {Field, Formik} from "formik";
import * as Yup from "yup";
import {validateEmail} from "./api/validate-email";

const Form = styled.form`
    padding: ${SPACING_L};
`

const TEST_CAMPAIGN_UUID = '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a'

const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters long.').required('Required'),
    passwordRepeat: Yup.string().min(8, 'Password must be at least 8 characters long.').required('Required')
})

const validateEmailField = async (campaignUuid, email) => {
    if ((email?.length ?? 0) === 0) {
        return true;
    }
    const isEmailValid = await validateEmail({campaignUuid, email})
    return isEmailValid ? undefined : 'This email already exists.'
}

const App = () => {
    const [hasSignedUp, setHasSignedUp] = useState(false)

    const onFormSubmit = async (values, actions) => {
        const {firstName, lastName, email, password, passwordRepeat} = values
        if (password !== passwordRepeat) {
            actions.setFieldError('password', 'The two password fields do not match.')
            actions.setFieldError('passwordRepeat', 'The two password fields do not match.')
            return
        }
        await signup({campaignUuid: TEST_CAMPAIGN_UUID, firstName, lastName, email, password})
        setHasSignedUp(true)
        actions.setSubmitting(false)
    };

    if (hasSignedUp) {
        return <>
            <p>You've successfully signed up.</p>
            <a href='#' onClick={() => setHasSignedUp(false)}>&laquo; Back</a>
        </>
    }

    const initialValues = {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordRepeat: ''
    };
    return (
        <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={onFormSubmit}>
            {props =>
                <Form onSubmit={props.handleSubmit}>
                    <InputField labelText='First Name' id='first-name'
                                error={props.touched.firstName && props.errors.firstName}>
                        <input name='firstName' type='text' id='first-name' onChange={props.handleChange}/>
                    </InputField>
                    <InputField labelText={'Last Name'} id='last-name'
                                error={props.touched.lastName && props.errors.lastName}>
                        <input name='lastName' type='text' id='last-name' onChange={props.handleChange}/>
                    </InputField>
                    <Field name="email" validate={email => validateEmailField(TEST_CAMPAIGN_UUID, email)}>
                        {({field, meta}) => (
                            <InputField labelText={'Email address'} id='email'
                                        error={meta.touched && meta.error}>
                                <input type='text' id='email' {...field}/>
                            </InputField>
                        )}
                    </Field>
                    <InputField labelText={'Password'} id='password'
                                error={props.touched.password && props.errors.password}>
                        <input name='password' type='password' id='password' onChange={props.handleChange}/>
                    </InputField>
                    <InputField labelText={'Password'} id='password'
                                error={props.touched.passwordRepeat && props.errors.passwordRepeat}>
                        <input name='passwordRepeat' type='password' id='password-repeat'
                               onChange={props.handleChange}/>
                    </InputField>

                    <button type='submit' disabled={props.isSubmitting}>Sign up</button>
                </Form>
            }
        </Formik>
    )
};

export default App
