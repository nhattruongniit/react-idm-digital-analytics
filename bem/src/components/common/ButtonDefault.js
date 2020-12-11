import React from 'react';
import styled, { css } from 'styled-components';

const ButtonStyled = styled.button`
  font-size: 14px;
  border-radius: 2px;
  width: 120px;
  height: 33px;
  line-height: 33px;
  cursor: pointer;
  background-color: ${props => props.bgColor || '#fff'};
  border: 1px solid ${props => props.bgColor || '#74829F'};
  color: ${props => props.textColor || '#74829F'}

  &+& {
    margin-left: 10px;
  }

  ${props => props.isChangingStatusAddon && css`
    opacity: 0.7;
    cursor: not-allowed;
  `}
`

const ButtonDefault = ({ label, onClick, bgColor, textColor, isChangingStatusAddon }) => {
  return <ButtonStyled type="button" onClick={onClick} bgColor={bgColor} textColor={textColor} isChangingStatusAddon={isChangingStatusAddon} >{label}</ButtonStyled>
}

export default ButtonDefault;