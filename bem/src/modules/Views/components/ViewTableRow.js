import React, { useRef, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import EditableName from 'components/common/DashboardGrid/EditableName';
import moment from 'moment';

import SkeletonText from 'carbon-components-react/lib/components/SkeletonText';
import { DataTable, Checkbox } from 'carbon-components-react';
import MenuIcon from '@carbon/icons-react/es/overflow-menu--horizontal/16';
import PopoverButton from 'components/common/PopoverButton';
import TableContextMenu, {
  MenuItem
} from 'components/common/DashboardTable/TableContextMenu';
import Circle from 'components/common/Circle';

const { TableRow, TableCell } = DataTable;


const MenuIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const RowStyled = styled(TableRow)`
  ${props => props.disabled && css`
    cursor: not-allowed;;
    opacity: .7
  `}
`

const ViewTableRow = ({
  rowData,
  deleteFn,
  isSelected,
  selectItem,
  setItemName,
  duplicateViewFn,
  circles
}) => {
  const editableNameRef = useRef(null);
  const amountChart = (Array.isArray(rowData.charts) && rowData.charts.length) || rowData.charts;
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
          />)
        }
      </TableCell>
      <TableCell>
        {isSkeleton ? (
          <SkeletonText />
        ) : (
          <EditableName
            href={`/dashboard/${rowData.project_id}/views/${rowData.id}/charts`}
            name={rowData.view_name}
            onNameChange={onNameChange}
            ref={editableNameRef}
          />
        )}
      </TableCell>
      <TableCell>
        {isSkeleton ? <SkeletonText /> : <>{amountChart}</>}
      </TableCell>
      <TableCell>
        {isSkeleton ? <SkeletonText /> : <> {rowData.simulations || 0}</>}
      </TableCell>
      <TableCell>
        {isSkeleton ? <SkeletonText /> : <>  {moment(rowData.updated_at).fromNow()}</>}
      </TableCell>
      <TableCell>
        <MenuIconContainer>
          <PopoverButton
            autoHidden={circles[rowData.id]}
            icon={<MenuIcon fill="var(--cds-text-02,#525252)" />}
            content={
              <TableContextMenu>
                <MenuItem onClick={onRequestRename}>Rename</MenuItem>
                <MenuItem onClick={() => duplicateViewFn(rowData.id)}>
                  Duplicate
                </MenuItem>
                <MenuItem onClick={() => deleteFn(rowData.id)}>Delete</MenuItem>
              </TableContextMenu>
            }
            height="auto"
          />
        </MenuIconContainer>
      </TableCell>
    </RowStyled>
  );
};

export default ViewTableRow;
