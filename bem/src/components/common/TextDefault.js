import React, { memo } from 'react';
import styled from 'styled-components';

const TextStyled = styled.div`
  font-size: ${props => props.fontsize || 14}px;
`

const TextDefault = ({ text, fontsize }) => {
  return (
    <TextStyled fontSize={fontsize}>
      <span className="bx-text-default">{text}</span>
    </TextStyled>
  )
}

export default memo(TextDefault);