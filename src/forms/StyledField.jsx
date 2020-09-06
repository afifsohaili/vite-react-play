import React from 'react'
import styled from 'styled-components'
import {COLOR_ERROR, COLOR_THEME_LIGHTER, SPACING_XL, SPACING_XS} from "../styles";

const InputWrapper = styled.div`
    margin-bottom: ${SPACING_XL};
`

const InputLabel = styled.label`
    display: block;
    margin-bottom: ${SPACING_XS};
`

const FieldMessage = styled.p`
    margin: ${SPACING_XS} 0;
`

const ErrorMessage = styled(FieldMessage)`
    margin: ${SPACING_XS} 0;
    color: ${COLOR_ERROR}
`

const StyledField = ({labelText, id, children, error}) => (
    <InputWrapper>
        <InputLabel htmlFor={id}>{labelText}</InputLabel>
        {children}
        {error?.length ? <ErrorMessage>{error}</ErrorMessage> : null}
    </InputWrapper>
)

const StyledInput = styled.input`
  border: 0 none;
  border-bottom: 1px solid ${COLOR_THEME_LIGHTER};
  padding: ${SPACING_XS};
  width: 100%;
`

export {StyledField, StyledInput, FieldMessage}
