import React, {useState} from 'react'
import './App.css'
import {InputField} from "./forms/InputField";
import styled from 'styled-components';
import {SPACING_L} from "./styles";
import {signup} from "./api/signup";

const Form = styled.form`
    padding: ${SPACING_L};
`

const TEST_CAMPAIGN_UUID = '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a'

function App() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [error, setError] = useState('')
    const [hasSignedUp, setHasSignedUp] = useState(false)

    const formSubmit = async (e) => {
        e.preventDefault()
        if (password !== passwordRepeat) {
            setError('The two password fields do not match.')
            return
        }
        setError('')
        await signup({campaignUuid: TEST_CAMPAIGN_UUID, firstName, lastName, email, password})
        setHasSignedUp(true)
    }

    const clearErrorAndUpdate = stateUpdateFn => e => {
        setError('')
        stateUpdateFn(e.target.value)
    }

    return (
        <>
            {hasSignedUp && <p>You've successfully signed up.</p>}
            {error.length > 0 && <p>{error}</p>}
            <Form onSubmit={formSubmit}>
                <InputField labelText='First Name' id='first-name'>
                    <input name='firstName' type='text' id='first-name' onChange={clearErrorAndUpdate(setFirstName)}/>
                </InputField>
                <InputField labelText={'Last Name'} id='last-name'>
                    <input name='lastName' type='text' id='last-name' onChange={clearErrorAndUpdate(setLastName)}/>
                </InputField>
                <InputField labelText={'Email address'} id='email'>
                    <input name='email' type='text' id='email' onChange={clearErrorAndUpdate(setEmail)}/>
                </InputField>
                <InputField labelText={'Password'} id='password'>
                    <input name='password' type='password' id='password' onChange={clearErrorAndUpdate(setPassword)}/>
                </InputField>
                <InputField labelText={'Password'} id='password'>
                    <input name='password' type='password' id='password' onChange={clearErrorAndUpdate(setPasswordRepeat)}/>
                </InputField>

                <button type='submit'>Sign up</button>
            </Form>
        </>
    )
}

export default App
