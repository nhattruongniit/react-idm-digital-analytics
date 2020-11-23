import React from 'react';

import Notification20 from "@carbon/icons-react/lib/notification/20";
import AppSwitcher20 from "@carbon/icons-react/lib/app-switcher/20";
import UserAvatarFilledAlt20 from "@carbon/icons-react/lib/user--avatar--filled--alt/20";
import {
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
} from "carbon-components-react/lib/components/UIShell";

function TopBar() {
  return (
    <Header className="topbar_header" aria-label="IBM Platform Name">
      <div>
        this is tab
      </div>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Notifications" onClick={() => {}}>
          <Notification20 />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Notifications" onClick={() => {}}>
          <UserAvatarFilledAlt20 />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="App Switcher" onClick={() => {}}>
          <AppSwitcher20 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  )
}

export default TopBar
