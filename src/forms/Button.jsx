import styled from "styled-components";
import {COLOR_THEME, COLOR_THEME_LIGHT, COLOR_THEME_LIGHTEST, SPACING, SPACING_S} from "../styles";

const BaseButton = styled.button`
  border-radius: 1rem 0.25rem 1rem 0.25rem;
  border: 0 none;
  cursor: pointer;
  padding: ${SPACING_S} ${SPACING};
  transition: box-shadow 0.3s ease-out;

  &:hover {
    box-shadow: 0 3px 10px 0 ${COLOR_THEME_LIGHTEST};
  }
`

export const PrimaryButton = styled(BaseButton)`
  background: linear-gradient(45deg, ${COLOR_THEME_LIGHT} 20%, ${COLOR_THEME});
  color: #fff;
`

export const Button = BaseButton
