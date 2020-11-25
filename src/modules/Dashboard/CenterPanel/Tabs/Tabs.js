import React from 'react';

// carbon icons
import Close20 from "@carbon/icons-react/lib/close/20";
import Add20 from "@carbon/icons-react/lib/add/20";

function Tabs() {
  return (
    <div className="tabs_root">
      <div className="tabs_item">
        <span>Workspace A </span>
      </div>
      <div className="tabs_item">
        <span>Workspace B</span>
      </div>
      <div className="tabs_item active">
        <span>Workspace-ECO</span>
        <div className="tabs_item_close" onClick={() => {}}><Close20 /></div>
      </div>
      <div className="tabs_item">
        <span>Workspace D</span>
      </div>
      <div className="tabs_item">
        <span>Workspace E</span>
      </div>
      <div className="tabs_add">
        <Add20 />
      </div>
    </div>
  )
}

export default Tabs
