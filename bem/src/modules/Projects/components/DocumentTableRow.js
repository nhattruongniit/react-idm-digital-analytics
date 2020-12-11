import React, { useRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';

import SkeletonText from 'carbon-components-react/lib/components/SkeletonText';
import { DataTable, Checkbox } from 'carbon-components-react';
import { Link } from 'react-router-dom';
import MenuIcon from '@carbon/icons-react/es/overflow-menu--horizontal/16';
import EditableName from 'components/common/DashboardGrid/EditableName';
import PopoverButton from 'components/common/PopoverButton';
import TableContextMenu, { MenuItem } from 'components/common/DashboardTable/TableContextMenu';
import Circle from 'components/common/Circle';

const {
  TableRow,
  TableCell,
} = DataTable;

const MenuIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ShortcutStyled = styled(Link)`
  border: 0;
  outline: 0;
  cursor: pointer;
  background-color: transparent;
  color: var(--cds-text-02,#525252);
  font-size: 17px;
  display: none;
  &+& {
    padding-left: 15px;
  }
  span {
    font-size: 9px;
  }
`

const UnShortcutStyled = styled.p`
  border: 0;
  outline: 0;
  cursor: pointer;
  background-color: transparent;
  color: var(--cds-text-02,#525252);
  font-size: 17px;
  display: none;
  padding-left: 15px;
  span {
    font-size: 9px;
  }
`

const RowStyled = styled(TableRow)`
  ${props => props.disabled && css`
    cursor: not-allowed;;
    opacity: .7
  `}
  &:hover {
    td a, td p {
      display: inline-block;
    }
  }
  td:nth-child(3) {
    width: 400px;
  }
`

const DocumentTableRow = ({
  rowData,
  duplicateFn,
  upgradeFn,
  deleteFn,
  maxIdfVersion,
  isSelected,
  selectItem,
  setItemName,
  projectId,
  circles
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
        {circles[rowData.id] ? <Circle /> : (
          <Checkbox
          id={`checkbox_${rowData.id}`}
          checked={isSelected}
          labelText=""
          hideLabel
          onChange={() => selectItem(rowData.id)}
          />
        )}
      </TableCell>
      <TableCell>
        {isSkeleton ? (
          <SkeletonText /> 
        ) : (
          <EditableName
            href={`/dashboard/${projectId}/documents/${rowData.id}/3d-editor`}
            name={rowData.document_name}
            onNameChange={onNameChange}
            ref={editableNameRef}
          />
        )}
      </TableCell>
      <TableCell>
        <ShortcutStyled to={`/dashboard/${projectId}/documents/${rowData.id}/3d-editor`}>3D</ShortcutStyled>
        <ShortcutStyled to={`/dashboard/${projectId}/documents/${rowData.id}/idf-editor`}>IDF</ShortcutStyled>
        <ShortcutStyled to={`/dashboard/${projectId}/documents/${rowData.id}/simulator`}>SiM</ShortcutStyled>
        <ShortcutStyled to={`/dashboard/${projectId}/views`}>Vi<span>ews</span></ShortcutStyled>
        <UnShortcutStyled>R<span>ES</span></UnShortcutStyled>
        <UnShortcutStyled>C<span>Edit</span></UnShortcutStyled>
      </TableCell>
      <TableCell>
        {isSkeleton ? <SkeletonText /> : <>{rowData.simulations || 0}</>}
      </TableCell>
      <TableCell>
        {isSkeleton ? <SkeletonText /> : <>{rowData.graphs || 0}</>}
      </TableCell>
      <TableCell>
        {isSkeleton ? <SkeletonText /> : <>{moment(rowData.updated_at).fromNow()}</>}
      </TableCell>
      <TableCell>
        <MenuIconContainer>
          <PopoverButton
            autoHidden={circles[rowData.id]}
            icon={<MenuIcon fill="var(--cds-text-02,#525252)" />}
            content={
              <TableContextMenu>
                <MenuItem onClick={onRequestRename}>Rename</MenuItem>
                <MenuItem onClick={() => duplicateFn(rowData.id)}>Duplicate</MenuItem>
                <MenuItem disabled={!isUpgradeable} onClick={() => {
                  if (isUpgradeable) {
                    upgradeFn(rowData.id);
                  }
                }}>
                  Upgrade IDF Version
                </MenuItem>
                <MenuItem onClick={() => deleteFn(rowData.id)}>Delete</MenuItem>
              </TableContextMenu>
            }
            height="auto"
          />
        </MenuIconContainer>
      </TableCell>
    </RowStyled>
  )
}

export default DocumentTableRow;