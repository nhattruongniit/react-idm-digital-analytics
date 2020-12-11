import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

// material icons
import ChevronDown20 from "@carbon/icons-react/lib/chevron--down/20";
import ChevronUp20 from "@carbon/icons-react/lib/chevron--up/20";

// selectors
import { treeProjectSelector } from 'selectors/navbar.selector'

// actions
import { fetchChildItems } from 'actions/navbar.action';

function NavBarTreeProject() {
  const [activeItems, setActiveItems] = useState({});
  const dispatch = useDispatch();
  const treeProject = useSelector(treeProjectSelector);
  const listProjects = Object.keys(treeProject).map(key => treeProject[key]).filter(item => item.root);

  const _toggleActiveItem = (project) => () => {
    const key = project.key;
    
    if(activeItems[key]) {
      delete activeItems[key];
    } else {
      activeItems[key] = true;
      dispatch(fetchChildItems(project))
    }
    setActiveItems({...activeItems})
  }

  console.log(activeItems)

  const renderItem = (item, level) => {
    const paddingLeft = level * 10;

    if(item.items.length > 0) {
      return (
        <Fragment key={`${item.id}`}>
          <li className="navbar_project navbar_ul_line" onClick={_toggleActiveItem(item)}>
            <div className="navbar_label">
              <span className="navbar_label_title" style={{ paddingLeft }}>{item.label}</span>
              <span className="navbar_label_icon">{activeItems[item.key] ? <ChevronDown20 /> : <ChevronUp20 />}</span>
            </div>
          </li>
           
            {activeItems[item.key] && (
              <>
                {item.items
                  .filter(itemKey => treeProject[itemKey])
                  .map(itemKey => renderItem(treeProject[itemKey], level + 1))}
              </>
            )}
        </Fragment>
      )
    } else {
      return (
        <div key={`${item.key}${item.label}`} className="navbar_label" onClick={_toggleActiveItem(item)}>
          <span className="navbar_label_title" style={{ paddingLeft }}>{item.label}</span>
          <span className="navbar_label_icon">{activeItems[item.key] ? <ChevronDown20 /> : <ChevronUp20 />}</span>
        </div>
      )
    }
  }

  
  return (
    <>
      {listProjects.length > 0 && listProjects.map(item => renderItem(item, 0))}
    </>
  )
}

export default NavBarTreeProject
