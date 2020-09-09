import React from 'react';
import styled from 'styled-components';
import {COLOR_GREY_LIGHT, COLOR_RED_LIGHTEST, SPACING} from "../styles";

export const Banner = styled.p`
  padding: ${SPACING};
  background: 1px solid ${COLOR_GREY_LIGHT};
  border-radius: 1rem 0.25rem 1rem 0.25rem;
`

export const ErrorBanner = styled(Banner)`
  background: ${COLOR_RED_LIGHTEST};
`
