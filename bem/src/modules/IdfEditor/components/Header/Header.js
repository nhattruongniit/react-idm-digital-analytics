import React from 'react';
import styled, { css } from 'styled-components';
import Close from '@carbon/icons-react/es/close/32';
import Menu from '@carbon/icons-react/es/menu/32';

const HeaderContainer = styled.div`
  box-shadow:inset 2px 2px 10px 0 #d9ebfd;
  height: 49px;
  position: relative;
  width: 100%;
  display: flex;  
  justify-content: center;

  ${props => props.isShowed && css`
    justify-content: flex-end;
  `}  
`;

const CloseIcon = styled(Close)`
  transition: all 0.3s ease;
  width: 24px;
  height: 24px;  
  cursor: pointer;
  margin-top: 14px;
  margin-right: 5px;
`;


const MenuIcon = styled(Menu)`
  transition: all 0.3s ease;
  width: 24px;
  height: 24px;  
  cursor: pointer;
  margin-top: 14px;
`;

const Header = ({ width, isShowed, setToggleClassList }) => {
  return (
    <HeaderContainer width={width} isShowed={isShowed}>
      {isShowed && <CloseIcon fill="var(--cds-text-02,#525252)" onClick={setToggleClassList}></CloseIcon>}
      {!isShowed && <MenuIcon fill="var(--cds-text-02,#525252)" onClick={setToggleClassList}></MenuIcon>}
    </HeaderContainer>
  );
}

export default Header;
