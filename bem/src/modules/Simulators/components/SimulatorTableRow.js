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

// component
import LogSymbol from '../../../components/common/LogSymbol';
import ProgressBar from '../../../components/common/ProgressBar';

const { TableRow, TableCell } = DataTable;

const MenuIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & > div > div {
    z-index: 1;
  }
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
  downloadFn,
  viewLogFn,
  perPage,
  currentPage,
  setModalConvertFn,
  projectId,
  apiBaseUrl,
  duplicateSimulationFn,
  circles
}) => {
  const editableNameRef = useRef(null);
  const formatDate = dateString => moment(dateString).format('DD MMMM YYYY');
  const formatTime = dateString => moment(dateString).format('HH:mm:ss');
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
          />
        )}
      </TableCell>
      <TableCell>
        {isSkeleton ? ( 
          <SkeletonText />
        ) : (
          <EditableName
            href={`/dashboard/${projectId}/documents/${rowData.document_id}/simulator/${rowData.id}/simulation-result`}
            name={rowData.simulation_name}
            onNameChange={onNameChange}
            ref={editableNameRef}
          />
        )}
      </TableCell>
      <TableCell>
        {isSkeleton ? <SkeletonText /> : <>{formatDate(rowData.created_at)}</>}
      </TableCell>
      <TableCell>
        {isSkeleton ? (
          <SkeletonText /> 
        ) : (
          <>
            {rowData.status === 'in progress' ? (
              <span>In progress</span>
            ) : (
              <span>{formatTime(rowData.created_at)} min</span>
            )}
          </>
        )}
      </TableCell>
      <TableCell>
        {isSkeleton ? (
          <SkeletonText /> 
        ) : (
          <>
            {rowData.status === 'in progress' ? (
              <ProgressBar item={rowData} />
            ) : (
              <LogSymbol item={rowData} />
            )}
          </>
        )}
      </TableCell>
      <TableCell>
        {isSkeleton ? (
          <SkeletonText /> 
        ) : (
          <>
            {rowData.size !== '0' && rowData.size}
          </>
        )}
      </TableCell>
      <TableCell>
        {isSkeleton ? <SkeletonText /> : <>{rowData.status}</>}
      </TableCell>
      <TableCell>
        <MenuIconContainer>
          <PopoverButton
            autoHidden={circles[rowData.id]}
            icon={<MenuIcon fill="var(--cds-text-02,#525252)"/>}
            content={
              <TableContextMenu>
                <MenuItem onClick={onRequestRename}>Rename</MenuItem>
                <MenuItem onClick={() => duplicateSimulationFn(rowData.id)}>Duplicate</MenuItem>
                <MenuItem
                  onClick={() =>
                    setModalConvertFn(rowData.id, rowData.simulation_name, true)
                  }
                >
                  Convert to ...
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    viewLogFn(rowData.id, currentPage, perPage, false)
                  }
                >
                  View Log
                </MenuItem>
                <MenuItem onClick={() => downloadFn(apiBaseUrl, rowData.id)}>
                  Download
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
