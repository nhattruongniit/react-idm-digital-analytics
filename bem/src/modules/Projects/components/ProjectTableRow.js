import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import moment from 'moment';

// carbons
import SkeletonText from 'carbon-components-react/lib/components/SkeletonText';
import { DataTable, Checkbox } from 'carbon-components-react';
import TableContextMenu, { MenuItem } from 'components/common/DashboardTable/TableContextMenu';
import MenuIcon from '@carbon/icons-react/es/overflow-menu--horizontal/16';
import EventsIcon from '@carbon/icons-react/es/events/16';
import EditIcon from '@carbon/icons-react/es/edit/16';
import CopyIcon from '@carbon/icons-react/es/copy/16';
import UpgradeIcon from '@carbon/icons-react/es/upgrade/16';
import TrashCanIcon from '@carbon/icons-react/es/trash-can/16';
import ViewIcon from '@carbon/icons-react/es/view/16';
import UnlockedIcon from '@carbon/icons-react/es/unlocked/16';
import EventsAltIcon from '@carbon/icons-react/es/events--alt/16';
import SchematicsIcon from '@carbon/icons-react/es/schematics/16';

import PopoverButton from 'components/common/PopoverButton';
import Circle from 'components/common/Circle';
import EditableName from 'components/common/DashboardGrid/EditableName';

const { TableRow, TableCell } = DataTable;

const MenuIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  a {
    text-decoration: none;
    color: #152934;
  }
`;

const ShortcutStyled = styled.div`
  display: none;
  cursor: pointer;

  & + & {
    margin-left: 20px;
  }
`

const RowStyled = styled(TableRow)`
  ${props => props.disabled && css`
    cursor: not-allowed;;
    opacity: .7
  `}

  td:nth-child(3) {
    width: 200px;
  }

  &:hover {
    ${ShortcutStyled} {
      display: inline-block;
    }
  }
`

const ItemsStyled = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`


const ProjectTableRow = ({
  rowData,
  duplicateFn,
  upgradeFn,
  deleteFn,
  maxIdfVersion,
  isSelected,
  selectItem,
  setItemName,
  circles,
  setModalCollaborate,
  setPrivateModal,
  setPublicModal
}) => {
  const editableNameRef = useRef(null);
  const [isSkeleton, setIsSkeleton] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsSkeleton(false), process.env.REACT_APP_TIME_LOADING_SKELETON || 700)
  }, [])

  function onNameChange(name) {
    setItemName(rowData.id, name);
  }

  function onRequestRename() {
    editableNameRef.current.editName();
  }

  const isUpgradeable = rowData.version_id < maxIdfVersion;

  return (
    <RowStyled key={rowData.id} disabled={circles[rowData.id]}>
      <TableCell key={`checkbox_${rowData.id}`}>
        {circles[rowData.id] ? 
          <Circle /> 
        : (<Checkbox
            id={`checkbox_${rowData.id}`}
            checked={isSelected}
            labelText=""
            hideLabel
            onChange={() => selectItem(rowData.id)}
          />)
        }
      </TableCell>
      <TableCell>
        {isSkeleton ? (
          <SkeletonText /> 
        ) : (
          <EditableName
            href={`/dashboard/${rowData.id}/documents`}
            name={rowData.project_name}
            onNameChange={onNameChange}
            ref={editableNameRef}
          />
        )}
      </TableCell>
      <TableCell>
        <ShortcutStyled><UnlockedIcon /></ShortcutStyled>
        <ShortcutStyled><EventsAltIcon /></ShortcutStyled>
      </TableCell>
      <TableCell>
        {isSkeleton ? <SkeletonText /> : <>{rowData.version}</>}
      </TableCell>
      <TableCell>
        {isSkeleton ? <SkeletonText /> : <>{rowData.idf_documents || 0}</>}
      </TableCell>
      <TableCell>
        {isSkeleton ? <SkeletonText /> : <>{rowData.simulations || 0}</>}
      </TableCell>
      <TableCell>
        {isSkeleton ? <SkeletonText /> : <>{rowData.charts || 0}</>}
      </TableCell>
      <TableCell>
        {isSkeleton ? <SkeletonText /> : <>{moment(rowData.updated_at).fromNow()}</>}
      </TableCell>
      <TableCell>
        <MenuIconContainer>
          <PopoverButton
            autoHidden={circles[rowData.id]}
            icon={<span className="iconSvg"><MenuIcon /></span>}
            content={
              <TableContextMenu>
                <MenuItem onClick={onRequestRename}>
                  <ItemsStyled>
                    <EditIcon />
                    <span>Rename</span>
                  </ItemsStyled>
                </MenuItem>
                <MenuItem onClick={() => duplicateFn(rowData.id)}>
                  <ItemsStyled>
                    <CopyIcon />
                    <span>Duplicate</span>
                  </ItemsStyled>
                </MenuItem>
                <MenuItem onClick={() => {
                  rowData.public ?
                      setPrivateModal(true, rowData.id)
                    : setPublicModal(true, rowData.id)
                }}>
                  <ItemsStyled>
                    <SchematicsIcon />
                    <span>{rowData.public ? "Make private" : "Make public" }</span>
                  </ItemsStyled>
                </MenuItem>
                <MenuItem
                  disabled={!isUpgradeable}
                  onClick={() => {
                    if (isUpgradeable) {
                      upgradeFn(rowData.id);
                    }
                  }}
                >
                  <ItemsStyled>
                    <UpgradeIcon />
                    <span>Upgrade IDF Version</span>
                  </ItemsStyled>
                </MenuItem>
                <MenuItem onClick={() => deleteFn(rowData.id)}>
                  <ItemsStyled>
                    <TrashCanIcon />
                    <span>Delete</span>
                  </ItemsStyled>
                </MenuItem>
                <MenuItem>
                  <Link to={`/dashboard/${rowData.id}/views`}>
                    <ItemsStyled>
                      <ViewIcon />
                      <span>Go to Views</span>
                    </ItemsStyled>
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => setModalCollaborate(rowData.id, true)}>
                  <ItemsStyled>
                    <EventsIcon />
                    <span>Share</span>
                  </ItemsStyled>
                </MenuItem>
              </TableContextMenu>
            }
          />
        </MenuIconContainer>
      </TableCell>
    </RowStyled>
  );
};

export default ProjectTableRow;
