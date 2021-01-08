import React from 'react';

// components
import DashboardNavBar from './DashboardNavBar';
import CenterPanel from './CenterPanel';

function Dashboard() {
  return (
    <div className="project_root">
      <DashboardNavBar />
      <CenterPanel />
    </div>
  )
}

export default Dashboard
