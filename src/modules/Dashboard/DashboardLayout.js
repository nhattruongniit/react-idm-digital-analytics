import React from 'react';
import { useSelector } from 'react-redux';

// components
import GridView from 'components/GridView';
import ListView from 'components/ListView';

import TableRow from './components/TableRow';
import GridItem from './components/GridItem';

// redux
import { layoutTypeSelector } from 'selectors/app.selector';

// mock data
import { projectData } from 'mockData';

const tableHeaders = [
  {
    key: 'project_name',
    header: 'Name'
  },
  {
    key: 'version',
    header: 'IDF Version',
  },
  {
    key: 'idf_documents',
    header: 'IDF Docs',
  },
  {
    key: 'simulations',
    header: 'Simulations',
  },
  {
    key: 'charts',
    header: 'Graphs',
  },
  {
    key: 'updated_at',
    header: 'Last modified',
  },
  {
    key: '',
    header: '',
  },
];

function DashboardLayout() {
  const layoutType = useSelector(layoutTypeSelector);

  return (
    <>
      {layoutType === 'grid' && <GridView data={projectData.data} gridItem={GridItem}  />}

      {layoutType === 'list' && <ListView data={projectData.data} tableheaders={tableHeaders} rowItem={TableRow} />}
      
    </>
  )
}

export default DashboardLayout;
