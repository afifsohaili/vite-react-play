import React, {useState} from 'react'
import './App.css'
import {InputField} from "./forms/InputField";
import styled from 'styled-components';
import {SPACING_L} from "./styles";
import {signup} from "./api/signup";
import {useFormik} from "formik";

const Form = styled.form`
    padding: ${SPACING_L};
`

const TEST_CAMPAIGN_UUID = '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a'

function App() {
    const [hasSignedUp, setHasSignedUp] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            passwordRepeat: ''
        },
        onSubmit: async values => {
            const {firstName, lastName, email, password, passwordRepeat} = values
            if (password !== passwordRepeat) {
                formik.errors.password = 'The two password fields do not match.'
                return
            }
            await signup({campaignUuid: TEST_CAMPAIGN_UUID, firstName, lastName, email, password})
            setHasSignedUp(true)
            formik.setSubmitting(false)
        }
    })

    if (hasSignedUp) {
        return <p>You've successfully signed up.</p>
    }

    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <InputField labelText='First Name' id='first-name' error={formik.errors.firstName}>
                    <input name='firstName' type='text' id='first-name' onChange={formik.handleChange}/>
                </InputField>
                <InputField labelText={'Last Name'} id='last-name' error={formik.errors.lastName}>
                    <input name='lastName' type='text' id='last-name' onChange={formik.handleChange}/>
                </InputField>
                <InputField labelText={'Email address'} id='email' error={formik.errors.email}>
                    <input name='email' type='text' id='email' onChange={formik.handleChange}/>
                </InputField>
                <InputField labelText={'Password'} id='password' error={formik.errors.password}>
                    <input name='password' type='password' id='password' onChange={formik.handleChange}/>
                </InputField>
                <InputField labelText={'Password'} id='password' error={formik.errors.password}>
                    <input name='passwordRepeat' type='password' id='password-repeat' onChange={formik.handleChange}/>
                </InputField>

                <button type='submit' disabled={formik.isSubmitting}>Sign up</button>
            </Form>
        </>
    )
}

export default App
