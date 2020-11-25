import React from 'react';

// carbon core
import {
  HeaderGlobalAction,
  HeaderGlobalBar,
} from "carbon-components-react/lib/components/UIShell";

// carbon icons
import Notification20 from "@carbon/icons-react/lib/notification/20";
import AppSwitcher20 from "@carbon/icons-react/lib/app-switcher/20";
import UserAvatarFilledAlt20 from "@carbon/icons-react/lib/user--avatar--filled--alt/20";

function GlobalBar() {
  return (
    <div className="globalBar_container">
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
    </div>
  )
}

export default GlobalBar
