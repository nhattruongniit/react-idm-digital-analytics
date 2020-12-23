import React from 'react';
import styled, { css } from 'styled-components';

const ContainerStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;

const ButtonStyled = styled.button`
  outline: none;
  cursor: pointer;
  padding: 0;
  background: transparent;
  border: none;
`;

const PopoverStyled = styled.div`
  position: absolute;
  right: -18px;
  top: 100%;
  margin-top: ${props => props.marginTop || '5px'};
  width: ${props => props.width || 'max-content'};
  height: ${props => props.height || 'max-content'};
  background: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: none;
  &:after {
    position: absolute;
    top: -4px;
    right: 22px;
    content: '';
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid white;
  }

  &:before {
    position: absolute;
    top: -5px;
    right: 22px;
    content: '';
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #dde2e6;
  }

  ${props =>
    props.popoverPosition &&
    props.popoverPosition === 'tabMenu' &&
    css`
      right: -90px;
      &:before,
      &:after {
        right: 93px;
      }
    `}

  ${props =>
    props.popoverPosition &&
    props.popoverPosition === 'variables' &&
    css`
      right: -5px;
      &:before,
      &:after {
        right: 7px;
      }
      padding: 14px;
      text-align: left;
      font-size: 0.9rem;
      width: 220px;
      height: 70px;
    `}

  ${props =>
    props.popoverPosition &&
    props.popoverPosition === 'notification' &&
    css`
      top: auto;
      bottom: 150%;
      &:before {
        bottom: -7px;
        top: auto;
        transform: rotate(180deg);
      }
      &:after {
        bottom: -7px;
        top: auto;
        transform: rotate(180deg);
      }
    `}
`;

const InputStyled = styled.input`
  position: absolute;
  top: 0px;
  padding: 0;
  margin: 0;
  left: 0px;
  width: 20px;
  height: 20px;
  opacity: 0;
  cursor: pointer;
  &:checked + ${PopoverStyled} {
    display: block;
  }
`;

const PopoverButton = ({
  icon,
  content,
  marginTop,
  popoverPosition,
  popoverWidth,
  popoverHeight,
  autoHidden,
}) => {
  return (
    <ContainerStyled>
      <ButtonStyled>{icon}</ButtonStyled>
      <InputStyled type="checkbox" />
      {autoHidden && <span className="autoHidden" />}
      <PopoverStyled
        marginTop={marginTop}
        popoverPosition={popoverPosition}
        width={popoverWidth}
        height={popoverHeight}
      >
        {content}
      </PopoverStyled>
    </ContainerStyled>
  );
};

export default PopoverButton;
