import React from 'react';

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

function NavBar() {
  return (
    <div className="navbar_root">
      <div className="navbar_top">
        <HeaderMenuButton
          aria-label="Open menu"
          isCollapsible
          onClick={() => {}}
          isActive={true}
        />
        <img className="navbar_logo" src={LogoIcon} alt="Logo" width="30px" />
      </div>
      <div className="navbar_container">
        <div className="navbar_options">
          <HeaderGlobalAction aria-label="Folder" onClick={() => {}}>
            <FolderDetails20 />
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
        <div className="navbar_treeview">
          <ul className="navbar_ul">
            <li className="navbar_project navbar_ul_line">
              <div className="navbar_label">
                <span className="navbar_label_title">My Projects</span>
                <span className="navbar_label_icon"> <ChevronDown20 /></span>
              </div>
              <ul>
                <li>
                  <div className="navbar_label">
                    <span className="navbar_label_title" style={{ paddingLeft: 10}}>101 Hopeful St.</span>
                    <span className="navbar_label_icon"> <ChevronDown20 /></span>
                  </div>
                  <ul>
                    <li>
                      <div className="navbar_label">
                        <span className="navbar_label_title" style={{ paddingLeft: 20}}>IDF_Document_1</span>
                        <span className="navbar_label_icon"> <ChevronDown20 /></span>
                      </div>
                      <ul>
                        <li>
                          <div className="navbar_label">
                            <span className="navbar_label_title" style={{ paddingLeft: 30}}>Simulation_A</span>
                            <span className="navbar_label_icon"> <ChevronDown20 /></span>
                          </div>
                          <ul>
                            <li>
                              <div className="navbar_label">
                                <span className="navbar_label_title" style={{ paddingLeft: 40}}>Result_Chart_1</span>
                              </div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="nav_space navbar_ul_line">
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
