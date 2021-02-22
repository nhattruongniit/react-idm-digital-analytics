import React, { Fragment, useState, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';

// material icons
import EditIcon from '@carbon/icons-react/es/edit/16';
import CopyFileIcon from '@carbon/icons-react/es/copy--file/16';
import TrashIcon from '@carbon/icons-react/es/trash-can/16';

// selectors
import { treeProjectSelector } from 'selectors/navbar.selector'

// actions
import { fetchChildItems } from 'actions/navbar.action';

function DashboardTreeView() {
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
        <ParentStyled level={level} data-level={level} style={{ paddingLeft }}>
          <TitleStyled className="navbar_label_title" onClick={_toggleActiveItem(item)} >{item.label}</TitleStyled>
          {item.root && (
            <ActionStyled>
              <ButtonStyled title="Edit Name" onClick={() => {}}>
                <EditIcon fill="#fff" width={16} height={16} />
              </ButtonStyled>
              <ButtonStyled title="Duplicate" onClick={() => {}}>
                <CopyFileIcon fill="#fff"  width={16} height={16} />
              </ButtonStyled>
              <ButtonStyled title="Delete" onClick={() => {}}>
                <TrashIcon fill="#fff" width={16} height={16} />
              </ButtonStyled>
            </ActionStyled>
          )}
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

export default memo(DashboardTreeView);

const ActionStyled = styled.div`
  align-items: center;
  display: none;
`

const TitleStyled = styled.div`
  flex-grow: 1;
  opacity: 0.7;
  padding: 2px 0;

  &:hover {
    opacity: 1;
  }
`

const ParentStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-top: 1px solid #393939;

  &:hover {
    ${ActionStyled}{
      display: flex;
    }
  }
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

const ButtonStyled = styled.div`
  cursor: pointer;
  fill: white;
  margin-right: 8px;

  &:last-child {
    margin-right: 0;
  }

  svg {
    opacity: 0.5
  }

  &:hover {
    svg {
      opacity: 1
    }
  }

  ${props => props.disabled && css`
    cursor: not-allowed;
    color: #e6e6e657;
    fill: #e6e6e657;
  `}
`;
