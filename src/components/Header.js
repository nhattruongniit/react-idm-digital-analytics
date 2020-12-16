import React from "react";
import { Link } from 'react-router-dom';
import {
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
} from "carbon-components-react/lib/components/UIShell";

// carbon icons
import UserAvatarFilledAlt20 from "@carbon/icons-react/lib/user--avatar--filled--alt/20";
import Notification20 from "@carbon/icons-react/lib/notification/20";
import AppSwitcher20 from "@carbon/icons-react/lib/app-switcher/20";

// assets
import LogoIcon from 'assets/images/logo.svg';

export default function DefaultPage() {
  return (
    <div className="header">
      <Header aria-label="IBM Platform Name">
        <Link to="/" className="header_logo">
          <img src={LogoIcon} alt="Logo" width="30px" />
        </Link>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="Notifications" onClick={() => {}}>
            <Notification20 />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="User" onClick={() => {}}>
            <UserAvatarFilledAlt20 />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="App Switcher" onClick={() => {}}>
            <AppSwitcher20 />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    </div>
  );
} 
