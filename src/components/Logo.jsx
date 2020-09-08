import React from 'react';
import styled from 'styled-components';
import {COLOR_ACCENT_DARK, COLOR_THEME, COLOR_THEME_LIGHT} from "../styles";

export const Logo = styled.h1`
  font-weight: 900;
  font-size: 2rem;
  letter-spacing: 0.236rem;
  background: linear-gradient(65deg, ${COLOR_ACCENT_DARK}, ${COLOR_THEME} 20%, ${COLOR_THEME_LIGHT} 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  text-transform: uppercase;
`
