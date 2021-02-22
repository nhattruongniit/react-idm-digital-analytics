import React from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

// carbon core
import {
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
} from "carbon-components-react/lib/components/UIShell";

// carbon icons
import UserAvatarFilledAlt20 from "@carbon/icons-react/lib/user--avatar--filled--alt/20";
import Notification20 from "@carbon/icons-react/lib/notification/20";
import AppSwitcher20 from "@carbon/icons-react/lib/app-switcher/20";

// selectors
import { isExpandDrawerSelector } from 'selectors/app.selector';

// assets
import LogoIcon from 'assets/images/logo.png';

export default function DefaultPage() {
  const isExpandDrawer = useSelector(isExpandDrawerSelector);

  return (
    <div className="header">
      <Header aria-label="IBM Platform Name">
        <Link to="/"  className="header_logo">
          <img src={LogoIcon} alt="Logo" width="30px" />
        </Link>
        <GlobalStyled isexpand={isExpandDrawer ? 1 : 0}>
          <HeaderGlobalAction aria-label="Notifications" onClick={() => {}}>
            <Notification20 />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="User" onClick={() => {}}>
            <UserAvatarFilledAlt20 />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="App Switcher" onClick={() => {}}>
            <AppSwitcher20 />
          </HeaderGlobalAction>
        </GlobalStyled>
      </Header>
    </div>
  );
} 

const GlobalStyled = styled(HeaderGlobalBar)`
  display: ${props => props.isexpand ? 'flex' : 'none'}
`
