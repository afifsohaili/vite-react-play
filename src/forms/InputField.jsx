import React from 'react'
import styled from 'styled-components'
import {SPACING} from "../styles";

const InputWrapper = styled.div`
    margin-bottom: ${SPACING};
`

const InputLabel = styled.label`
    display: block;
`

export const InputField = ({labelText, id, children}) => (
    <InputWrapper>
        <InputLabel htmlFor={id}>{labelText}</InputLabel>
        {children}
    </InputWrapper>
)
