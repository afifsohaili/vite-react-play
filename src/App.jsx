import React, {useState} from 'react'
import 'normalize.css'
import {FieldMessage, StyledField, StyledInput} from "./components/StyledField";
import {signup} from "./api/signup";
import {Field, Formik} from "formik";
import * as Yup from "yup";
import {validateEmail} from "./api/validate-email";
import {PrimaryButton} from "./components/Button";
import {SPACING_L, SPACING_XL} from "./styles";
import styled from 'styled-components';
import {SignupSuccess} from "./components/SignupSuccess";
import {Logo} from "./components/Logo";
import {LoadingIndicator} from "./components/LoadingIndicator";

const FormTitle = styled.h3`
  margin-bottom: ${SPACING_XL}
`

const LogoWrapper = styled.header`
  margin: ${SPACING_XL} 0;
`

const TEST_CAMPAIGN_UUID = '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a'

const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters long.').required('Required'),
    passwordRepeat: Yup.string().min(8, 'Password must be at least 8 characters long.').required('Required')
})

const STATUS_VALIDATING_EMAIL = 'STATUS_VALIDATING_EMAIL';

const validateEmailField = async (campaignUuid, email, formik) => {
    formik.setStatus(undefined)
    if ((email?.length ?? 0) === 0) {
        return true;
    }
    let errorMessage = undefined
    try {
        formik.setStatus(STATUS_VALIDATING_EMAIL)
        const isEmailValid = await validateEmail({campaignUuid, email})
        if (!isEmailValid) {
            errorMessage = 'This email already exists.'
        }
    } catch {
        errorMessage = 'Failed validation. Please choose another email.'
    }
    formik.setStatus(undefined)
    return errorMessage
}

export const SignupForm = styled.form`
    padding: ${SPACING_L};
    margin: 0 auto;
    width: clamp(min(100%, 600px), 33vw, 1000px);
`

const delay = (delayInSecs) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), delayInSecs * 1000)
    })
}

const App = () => {
    const [hasSignedUp, setHasSignedUp] = useState(false)
    const [generalError, setGeneralError] = useState('')

    const onFormSubmit = async (values, actions) => {
        const {firstName, lastName, email, password, passwordRepeat} = values
        if (password !== passwordRepeat) {
            actions.setFieldError('password', 'The two password fields do not match.')
            actions.setFieldError('passwordRepeat', 'The two password fields do not match.')
            return
        }
        try {
            await delay(2);
            await signup({campaignUuid: TEST_CAMPAIGN_UUID, firstName, lastName, email, password})
            setHasSignedUp(true)
        } catch (err) {
            setGeneralError(`Signup failed. Error: ${err.message}`)
        } finally {
            actions.setSubmitting(false)
        }
    };

    if (hasSignedUp) {
        return <SignupSuccess setHasSignedUp={setHasSignedUp}/>
    }

    const initialValues = {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordRepeat: ''
    };
    return (
        <Formik initialValues={initialValues}
                validationSchema={SignupSchema}
                onSubmit={onFormSubmit}
                validateOnBlur={true}
                validateOnChange={false}>
            {formik =>
                <SignupForm onSubmit={formik.handleSubmit}>
                    <LogoWrapper>
                        <Logo>Your Company</Logo>
                    </LogoWrapper>
                    <FormTitle>Create an account</FormTitle>
                    {(generalError?.length ?? 0) > 0 && <p>{generalError}</p>}
                    <StyledField labelText='First Name' id='first-name'
                                 error={formik.touched.firstName && formik.errors.firstName}>
                        <StyledInput name='firstName' type='text' id='first-name' placeholder='e.g. John'
                                     onChange={formik.handleChange}/>
                    </StyledField>
                    <StyledField labelText={'Last Name'} id='last-name'
                                 error={formik.touched.lastName && formik.errors.lastName}>
                        <StyledInput name='lastName' type='text' id='last-name' placeholder='e.g. Smith'
                                     onChange={formik.handleChange}/>
                    </StyledField>
                    <Field name="email" validate={email => validateEmailField(TEST_CAMPAIGN_UUID, email, formik)}>
                        {({field, meta}) => (
                            <StyledField labelText={'Email address'} id='email'
                                         error={meta.touched && meta.error}>
                                <StyledInput type='email' id='email' {...field}
                                             placeholder='e.g. john.doe@gmail.com'/>
                                {formik.status === STATUS_VALIDATING_EMAIL &&
                                <FieldMessage>Validating...</FieldMessage>}
                            </StyledField>
                        )}
                    </Field>
                    <StyledField labelText={' Password'} id='password'
                                 error={formik.touched.password && formik.errors.password}>
                        <StyledInput name='password' type='password' id='password' onChange={formik.handleChange}/>
                    </StyledField>
                    <StyledField labelText={' Repeat Password'} id='password'
                                 error={formik.touched.passwordRepeat && formik.errors.passwordRepeat}>
                        <StyledInput name='passwordRepeat' type='password' id='password-repeat'
                                     onChange={formik.handleChange}/>
                    </StyledField>

                    <PrimaryButton type='submit' disabled={formik.isSubmitting}>Sign up</PrimaryButton>
                    {formik.isSubmitting && <LoadingIndicator/>}
                </SignupForm>
            }
        </Formik>
    )
};

export default App
