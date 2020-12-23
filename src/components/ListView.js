import React from 'react';

// carbon cores
import { DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody } from 'carbon-components-react';

function ListView({ data, tableheaders, rowItem: RowItem }) {
  return (
    <div className="dashboardList_root">
      <DataTable rows={data} headers={tableheaders}>
        {({ rows, headers, getHeaderProps, getTableProps }) => (
          <TableContainer>
            <Table {...getTableProps()} size='tall'>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, key) => {
                  const rowData = data.find(item => item.id === row.id);
                  return (
                    <RowItem 
                      key={key.toString()}
                      rowData={rowData}
                    />
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
    </div>
  )
}

export default ListView
