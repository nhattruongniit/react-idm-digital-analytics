import React, {useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

// carbon icons
import ChevronDown20 from "@carbon/icons-react/lib/chevron--down/20";

// selectors
import { isExpandDrawerSelector } from 'selectors/app.selector';

// mockHttp
import * as api from 'services/mockHttp';

// actions
import { fetchDocuments } from 'actions/navbar.action';

// components
import NavBar from 'components/NavBar';
import ProjectTreeView from './ProjectTreeView';

function ProjectNavBar() {
  const dispatch = useDispatch();
  const isExpandDrawer = useSelector(isExpandDrawerSelector);
  const { id: projectId } = useParams();

  useEffect(() => {
    async function getDocuments() {
      const data = await api.fetchDocument(Number(projectId));
      dispatch(fetchDocuments(data))
    }
    getDocuments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={clsx("project_navbar", !isExpandDrawer && 'project_navbar-hide')}>
      <NavBar />
      <div className="navbar_treeview" style={{ display: isExpandDrawer ? 'block' : 'none'}}>
        <div className="menu_project">
          <ProjectTreeView />
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
  )
}

export default ProjectNavBar
