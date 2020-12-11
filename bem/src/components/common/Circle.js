import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

const CircleStyled = styled.div`
  width: 18px;
  height: 18px;
  border: 3px solid #a0a1a2;
  border-radius: 50%;
  z-index: 2;

  border-top: 3px solid #3d70b2;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  ${props => props.position === 'absolute' && css `
    position: absolute;
    top: ${props => props.top || 0}px;
    left: ${props => props.left || 0}px;
    right: ${props => props.right || 0}px;
    bottom: ${props => props.bottom || 0}px;
  `}
`

export default class Circle extends PureComponent {
  render() {
    const { position, top, left, right, bottom } = this.props;

    return  <CircleStyled position={position} top={top} left={left} bottom={bottom} right={right} /> 
  }
}