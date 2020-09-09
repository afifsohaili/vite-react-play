import styled from "styled-components";
import {
    COLOR_GREY_DARK,
    COLOR_GREY_LIGHT,
    COLOR_THEME,
    COLOR_THEME_LIGHT,
    COLOR_THEME_LIGHTER,
    COLOR_THEME_LIGHTEST,
    SPACING,
    SPACING_S
} from "../styles";

const BaseButton = styled.button`
  --color-shadow: ${COLOR_GREY_LIGHT};
  border-radius: 1rem 0.25rem 1rem 0.25rem;
  border: 0 none;
  box-shadow: 0 1px 5px 0 ${COLOR_THEME_LIGHTEST};
  cursor: pointer;
  padding: ${SPACING_S} ${SPACING};
  position: relative;
  transition: box-shadow 0.3s ease-out;

  &:hover {
    box-shadow: 0 3px 10px 0 var(--color-shadow);
  }
`

export const PrimaryButton = styled(BaseButton)`
  --color-shadow: ${COLOR_THEME_LIGHT};
  color: #fff;
  overflow: hidden;
  z-index: 1;
  background-color: ${COLOR_THEME};
  
  &[disabled] {
    background-color: ${COLOR_GREY_LIGHT};
    color: ${COLOR_GREY_DARK}
  }

  &:not([disabled])::before {
    bottom: 0;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    opacity: 1;
    background: linear-gradient(45deg, ${COLOR_THEME_LIGHT} 20%, ${COLOR_THEME});
    z-index: -1;
  }

  &:not([disabled])::after {
    bottom: 0;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.3s ease-out;
    opacity: 0;
    background: linear-gradient(45deg, ${COLOR_THEME_LIGHTER} 20%, ${COLOR_THEME_LIGHT});
    z-index: -1;
  }

  &:not([disabled]):hover::after {
    opacity: 1;
  }
`

export const Button = BaseButton
