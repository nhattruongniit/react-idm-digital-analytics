import React from 'react';
import dayjs  from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// carbon cores
import { TableCell, TableRow } from 'carbon-components-react';
import { Link } from 'react-router-dom';

dayjs.extend(relativeTime);

function DashboardRow({ rowData }) {
  return (
    <TableRow>
      <TableCell>
        <Link to={`project/${rowData.id}`}>
          {rowData.project_name}
        </Link>
      </TableCell>
      <TableCell>{rowData.version}</TableCell>
      <TableCell>{rowData.idf_documents}</TableCell>
      <TableCell>{rowData.simulations}</TableCell>
      <TableCell>{rowData.charts}</TableCell>
      <TableCell>{dayjs().from(dayjs(rowData.updated_at).format('YYYY-DD-MM'))}</TableCell>
    </TableRow>
    
  )
}

export default DashboardRow
