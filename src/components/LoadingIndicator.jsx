import React from 'react';
import styled, {keyframes} from 'styled-components';
import {SPACING} from "../styles";

const rotatingKeyframes = keyframes`
    0% {
      transform: rotate(0deg);
    }
    
    100% {
      transform: rotate(1440deg);
    }
`

const RotatingIcon = styled.span`
  animation: ${rotatingKeyframes} 1.5s ease-in-out infinite normal;
  transform-origin: center;
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin: 0 ${SPACING};
`

export const LoadingIndicator = () => {
    return <RotatingIcon>
        <i className='gg-shape-half-circle'/>
    </RotatingIcon>
}
