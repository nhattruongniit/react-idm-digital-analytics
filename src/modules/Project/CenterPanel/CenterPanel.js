import React from 'react'

// components
import GridLayout from './GridLayout';
import CenterPanelBox from './CenterPanelBox';

function CenterPanel() {
  return (
    <div className="project_main">
      <CenterPanelBox>
        <GridLayout />
      </CenterPanelBox>
    </div>
  )
}

export default CenterPanel;
