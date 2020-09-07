import React from 'react';
import styled from 'styled-components';

export const CheckIcon = ({size = 1, color = '#393939'}) => {
    const Icon = styled.i`
      color: ${color};
      --ggs: ${size};
      margin: 0 auto;
    `

    return <Icon className='gg-check-o'/>
}
