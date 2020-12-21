import React from 'react';

// components
import ProjectNavBar from './ProjectNavBar';
import CenterPanel from './CenterPanel';

function Project() {
  return (
    <div className="project_root">
      <ProjectNavBar />
      <CenterPanel />
    </div>
  )
}

export default Project
