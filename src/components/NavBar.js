import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// carbon core
import {
  HeaderGlobalAction,
} from "carbon-components-react/lib/components/UIShell";

// carbon icons
import FolderDetails20 from "@carbon/icons-react/lib/folder--details/20";
import FolderDetailsReference20 from "@carbon/icons-react/lib/folder--details--reference/20";
import Settings20 from "@carbon/icons-react/lib/settings/20";
import Help20 from "@carbon/icons-react/lib/help/20";
import Search20 from "@carbon/icons-react/lib/search/20";
import Snowflake20 from "@carbon/icons-react/lib/snowflake/20";

// redux
import { setExpandDrawer } from 'actions/app.action';
import { isExpandDrawerSelector } from 'selectors/app.selector';

function NavBar() {
  const dispatch = useDispatch();
  const isExpandDrawer = useSelector(isExpandDrawerSelector);

  const _handleChangeDrawer = () => {
    dispatch((setExpandDrawer(!isExpandDrawer)))
  }

  return (
    <div className="navbar_options">
      <HeaderGlobalAction aria-label="Folder" onClick={_handleChangeDrawer}>
        {isExpandDrawer ? <FolderDetails20 /> : <FolderDetailsReference20 /> }
      </HeaderGlobalAction>
      <HeaderGlobalAction aria-label="Folder" onClick={() => {}}>
        <Snowflake20 />
      </HeaderGlobalAction>
      <HeaderGlobalAction aria-label="Folder" onClick={() => {}}>
        <Search20 />
      </HeaderGlobalAction>
      <HeaderGlobalAction aria-label="Settings" onClick={() => {}}>
        <Settings20 />
      </HeaderGlobalAction>
      <HeaderGlobalAction aria-label="Help" onClick={() => {}}>
        <Help20 />
      </HeaderGlobalAction>
    </div>
  )
}

export default NavBar
