import React, { useRef, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';

import SkeletonText from 'carbon-components-react/lib/components/SkeletonText';
import EditableName from 'components/common/DashboardGrid/EditableName';
import moment from 'moment';
import { DataTable, Checkbox } from 'carbon-components-react';
import MenuIcon from '@carbon/icons-react/es/overflow-menu--horizontal/16';
import PopoverButton from 'components/common/PopoverButton';
import TableContextMenu, { MenuItem } from 'components/common/DashboardTable/TableContextMenu';
import { openChart } from '../reducers/simulationResult';
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

const NameStyled = styled.div`
  cursor: pointer;
  text-decoration: underline;
`

const TableRowStyled = styled(TableRow)`
  ${props => (props.isfile && !props.isexpand) && css`
    display: none
  `}
  ${props => props.disabled && css`
    cursor: not-allowed;;
    opacity: .7
  `}
`

const ViewTableRow = ({
  rowData,
  isSelected,
  selectItem,
  setItemName,
  viewFileFn,
  simulatorId,
  deleteFn,
  clearSelectedItemsFn,
  match,
  setModalSendViewFn,
  isExpand,
  circles
}) => {
  const editableNameRef = useRef(null);
  const isFile = rowData.type === 'directory' || rowData.type === 'file';
  const formatDate = dateString => moment(dateString).format('DD MMM YYYY');
  const formatTime = dateString =>  moment(dateString).format('HH:mm');
  const [isSkeleton, setIsSkeleton] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsSkeleton(false), process.env.REACT_APP_TIME_LOADING_SKELETON || 700)
  }, [])

  function onNameChange(name) {
    setItemName(rowData.id, name, rowData.parent_simulation_id, rowData.type, rowData.options)
  }

  function onRequestRename() {
    editableNameRef.current.editName();
  }

  const handleViewFile = () => {
    viewFileFn(simulatorId, rowData.path)
  }

  const handleOpenChart = () => {
    const { projectId, documentId, simulatorId } = match.params;
    openChart(projectId, documentId, simulatorId, rowData.id)
  }

  const handleSentToView = id => {
    clearSelectedItemsFn();
    setModalSendViewFn(true, [id])
  }

  return (
    <TableRowStyled key={String(rowData.id)} isfile={isFile ? 1 : 0} isexpand={isExpand ? 1 : 0} disabled={circles[rowData.id]} >
      <TableCell key={`checkbox_${rowData.id}`}>
        {isFile ? null : (
          <>
            {circles[rowData.id] ? <Circle /> : (
              <Checkbox
                id={`checkbox_${rowData.id}`}
                checked={isSelected}
                labelText=""
                hideLabel
                onChange={() => selectItem(rowData.id)}
              />
            )}
          </>
        )}
      </TableCell>
      <TableCell>
        <NameStyled onClick={isFile ? handleViewFile : handleOpenChart}>
          {isSkeleton ? (
            <SkeletonText />
          ) : ( 
            <EditableName
              name={rowData.path || rowData.chart_name}
              onNameChange={onNameChange}
              ref={editableNameRef}
            />
          )}
        </NameStyled>
      </TableCell>
      <TableCell>
        {isSkeleton ? <SkeletonText /> : <>{rowData.type}</>}
      </TableCell>
      <TableCell>
      {isSkeleton ? <SkeletonText /> : <>{rowData.size}</>}
      </TableCell>
      <TableCell>
      {isSkeleton ? (
        <SkeletonText /> 
      ) : (
        <>
          {rowData.created_at && <span>{formatDate(rowData.created_at)}</span>}
        </>
      )}
      </TableCell>
      <TableCell>
        {isSkeleton ? (
          <SkeletonText /> 
        ) : (
          <>
            {rowData.created_at && <span>{formatTime(rowData.created_at)}</span>}
          </>
        )}
      </TableCell>
      <TableCell>
        {isFile ? null : (
          <MenuIconContainer>
            <PopoverButton
              autoHidden={circles[rowData.id]}
              icon={<MenuIcon fill="var(--cds-text-02,#525252)"/>}
              content={
                <TableContextMenu>
                  <MenuItem onClick={onRequestRename}>Rename</MenuItem>
                  <MenuItem onClick={() => handleSentToView(rowData.id)}>Send to View</MenuItem>
                  <MenuItem onClick={() => deleteFn(rowData.id)}>Delete</MenuItem>
                </TableContextMenu>
              }
              height="auto"
            />
          </MenuIconContainer>
        )}
        
      </TableCell>
    </TableRowStyled>
  )
}

export default withRouter(ViewTableRow);