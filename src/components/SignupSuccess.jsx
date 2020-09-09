import React from "react";
import {COLOR_THEME, SPACING_L, SPACING_XL} from "../styles";
import styled from 'styled-components';
import {CheckIcon} from "./icons/CheckIcon";
import {Button} from "./Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  height: 100%;
  width: clamp(min(100%, 300px), 25vw, 800px);
  text-align:center;
`

const Message = styled.p`
  padding: ${SPACING_L} 0;
  margin: 0 auto;
`

const BackButton = styled(Button)`
  align-self: center;
`

export const SignupSuccess = ({setHasSignedUp}) => {
    return <Container>
        <CheckIcon color={COLOR_THEME} size={2}/>
        <Message>
            You've successfully signed up.
        </Message>
        <BackButton onClick={() => setHasSignedUp(false)}>&laquo; Back</BackButton>
    </Container>
}
