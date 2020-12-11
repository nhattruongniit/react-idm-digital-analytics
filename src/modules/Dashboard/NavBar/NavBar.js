import React, {useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

// carbon core
import {
  HeaderMenuButton,
  HeaderGlobalAction,
} from "carbon-components-react/lib/components/UIShell";

// carbon icons
import FolderDetails20 from "@carbon/icons-react/lib/folder--details/20";
import Settings20 from "@carbon/icons-react/lib/settings/20";
import Help20 from "@carbon/icons-react/lib/help/20";
import ChevronDown20 from "@carbon/icons-react/lib/chevron--down/20";
import Search20 from "@carbon/icons-react/lib/search/20";
import Snowflake20 from "@carbon/icons-react/lib/snowflake/20";

// assets
import LogoIcon from 'assets/images/logo.svg';

// actions
import { setExpandDrawer } from 'actions/app.action';

// selectors
import { isExpandDrawerSelector } from 'selectors/app.selector';

// mockHttp
import { fetchProject } from 'services/mockHttp';

// actions
import { fetchProjects } from 'actions/navbar.action';

// components
import NavBarTreeProject from './NavBarTreeProject';

function NavBar() {
  const dispatch = useDispatch();
  const isExpandDrawer = useSelector(isExpandDrawerSelector);

  useEffect(() => {
    async function getProject() {
      const data = await fetchProject();
      dispatch(fetchProjects(data))
    }
    getProject();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleDrawer = () => {
    dispatch(setExpandDrawer(!isExpandDrawer))
  }

  return (
    <div className={clsx('navbar_root', !isExpandDrawer && 'navbar_root_hidden')}>
      <div className="navbar_top">
        <HeaderMenuButton
          aria-label="Open menu"
          isCollapsible
          onClick={toggleDrawer}
          isActive={isExpandDrawer}
        />
        {isExpandDrawer  && <img className="navbar_logo" src={LogoIcon} alt="Logo" width="30px" /> }
      </div>
      <div className="navbar_container">
        <div className="navbar_options">
          <HeaderGlobalAction aria-label="Folder" onClick={() => {}}>
            <FolderDetails20 />
          </HeaderGlobalAction>
          {isExpandDrawer ? (
            <>
              <HeaderGlobalAction aria-label="Folder" onClick={() => {}}>
                <Snowflake20 />
              </HeaderGlobalAction>
              <HeaderGlobalAction aria-label="Folder" onClick={() => {}}>
                <Search20 />
              </HeaderGlobalAction>
            </>
          ) : null}
          <HeaderGlobalAction aria-label="Settings" onClick={() => {}}>
            <Settings20 />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Help" onClick={() => {}}>
            <Help20 />
          </HeaderGlobalAction>
        </div>
        <div className={clsx('navbar_treeview', !isExpandDrawer && 'navbar_treeview_hidden')}>
          <div className="menu_project">
            <NavBarTreeProject />
          </div>
          <ul className="navbar_ul">
            <li className="nav_space navbar_ul_line nav_ul_line_first">
              <div className="navbar_label">
                <span className="navbar_label_title">Draftls</span>
                <span className="navbar_label_icon"> <ChevronDown20 /></span>
              </div>
            </li>
            <li className="nav_space navbar_ul_line">
              <div className="navbar_label">
                <span className="navbar_label_title">Deleted</span>
                <span className="navbar_label_icon"> <ChevronDown20 /></span>
              </div>
            </li>
            <li className="nav_space navbar_ul_line">
              <div className="navbar_label">
                <span className="navbar_label_title">My Worksapces</span>
                <span className="navbar_label_icon"> <ChevronDown20 /></span>
              </div>
            </li>
            <li className="nav_space navbar_ul_line">
              <div className="navbar_label">
                <span className="navbar_label_title">Shared Worksapces</span>
                <span className="navbar_label_icon"> <ChevronDown20 /></span>
              </div>
            </li>
            <li className="nav_space navbar_ul_line">
              <div className="navbar_label">
                <span className="navbar_label_title">Public Worksapces</span>
                <span className="navbar_label_icon"> <ChevronDown20 /></span>
              </div>
            </li>
            <li className="nav_space navbar_ul_line">
              <div className="navbar_label">
                <span className="navbar_label_title">Admin Worksapces</span>
                <span className="navbar_label_icon"> <ChevronDown20 /></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavBar
