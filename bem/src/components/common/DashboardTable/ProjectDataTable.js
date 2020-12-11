import React from 'react';
import { DataTable, Checkbox } from 'carbon-components-react';
import styled from 'styled-components';
// import { DASHBOARD_TABLE_ROW_HEIGHT } from 'appConstants';

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableHeader,
} = DataTable;

const StyledTableContainer = styled(TableContainer)`
  overflow: unset !important;
  position: relative;
  .bx--data-table th, .bx--data-table td{
    vertical-align: middle;
  }
`;
// ${props => props.height === DASHBOARD_TABLE_ROW_HEIGHT.SHORT && css`
//     .bx--data-table tbody tr {
//       height: ${props => props.height === DASHBOARD_TABLE_ROW_HEIGHT.SHORT && '30px'}
//     }
//     .bx--data-table td {
//       padding: ${props => props.height === DASHBOARD_TABLE_ROW_HEIGHT.SHORT && '0 1rem'}
//     }
//   `}

const AllCheckStyled = styled.div`
  display: ${props => props.show ? "block" : "none"}
`

const ProjectDataTable = ({
  isIndeterminateSelectAll,
  isSelectAll,
  items,
  selectedIds,
  toggleSelectAll,
  rowHeight,
  headers,
  tableRowComponent,
  GroupRowFolder,
  showOutputFolder,
  setAccordionFn,
  isExpand,
  noSortable,
  sizeTable,
  useZebraStyles,
  showCheckboxAll,
  ...props
}) => {
  return (
    <DataTable
      rows={items}
      headers={headers}
      render={({ rows, headers, getHeaderProps }) => (
        <StyledTableContainer height={rowHeight}>
          <Table size={sizeTable} useZebraStyles={useZebraStyles}>
            <TableHead>
              <TableRow>
                <TableHeader key="checkbox_all" >
                  <AllCheckStyled show={showCheckboxAll}>
                    <Checkbox
                      id="checkbox_all"
                      checked={isSelectAll}
                      labelText=""
                      hideLabel
                      onChange={toggleSelectAll}
                      indeterminate={isIndeterminateSelectAll}
                    />
                  </AllCheckStyled>
                </TableHeader>  
                {noSortable ? (
                  <>
                    {headers.map((header, idx) => (
                      <TableHeader key={idx}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </>
                ) : (
                  <>
                    {headers.map(header => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </>
                )}
                <TableHeader></TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {showOutputFolder && <GroupRowFolder isExpand={isExpand} setAccordion={setAccordionFn}/> }
              {rows.map((row, key) => {
                const isSelected = selectedIds.indexOf(row.id) !== -1;
                const TableRowComponent = tableRowComponent;
                const rowData = items.find(item => item.id === row.id);
                return (
                  <>
                    <TableRowComponent
                      rowData={rowData}
                      isSelected={isSelected}
                      key={key}
                      isExpand={isExpand}
                      {...props}
                    />
                  </>
                )
              })}
            </TableBody>
          </Table>
        </StyledTableContainer> 
      )}
    />
  );
}

export default ProjectDataTable;
