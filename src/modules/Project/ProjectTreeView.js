import React, { Fragment, useState, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';

// material icons
import ChevronDown20 from "@carbon/icons-react/lib/chevron--down/20";
import ChevronUp20 from "@carbon/icons-react/lib/chevron--up/20";

// selectors
import { treeProjectSelector } from 'selectors/navbar.selector'

// actions
import { fetchChildItems } from 'actions/navbar.action';

function ProjectTreeView() {
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


  const renderItem = (item, level) => {
    const paddingLeft = level * 10;

    return (
      <Fragment key={`${item.id}`}>
        <ParentStyled level={level} data-level={level} onClick={_toggleActiveItem(item)} style={{ paddingLeft }}>
          <span className="navbar_label_title">{item.label}</span>
          <span className="navbar_label_icon">{activeItems[item.key] ? <ChevronUp20 /> : <ChevronDown20 /> }</span>
        </ParentStyled>
        {activeItems[item.key] && (
          <>
            {item.items
              .filter(itemKey => treeProject[itemKey])
              .map(itemKey => renderItem(treeProject[itemKey], level + 1))}
          </>
        )}
      </Fragment>
    )
  }
  
  return (
    <>
      {listProjects.length > 0 && listProjects.map(item => renderItem(item, 0))}
    </>
  )
}

export default memo(ProjectTreeView);

const ParentStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-top: 1px solid #393939;
  ${props => props.level === 0 && css`
    padding: 16px 0 16px;
  `}

  ${props => props.level === 1 && css`
    padding: 0px 0 8px;
    border-top: 0
  `}

  ${props => props.level === 2 && css`
    padding: 0px 0 8px;
    border-top: 0
  `}
`
