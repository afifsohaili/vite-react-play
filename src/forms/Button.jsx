import styled from "styled-components";
import {COLOR_THEME, SPACING, SPACING_S} from "../styles";

const BaseButton = styled.button`
  border-radius: 1rem 0.25rem 1rem 0.25rem;
  border: 0 none;
  cursor: pointer;
  padding: ${SPACING_S} ${SPACING};
`
export const PrimaryButton = styled(BaseButton)`
  background: ${COLOR_THEME};
  color: #fff;
`

export const Button = BaseButton
