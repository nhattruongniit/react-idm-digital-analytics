import React from 'react'

// components
import Tabs from './Tabs';
import GlobalBar from './GlobalBar';

function CenterPanel({ children }) {
  return (
    <div className="centerPanel_wrapper">
      <div className="centerPanel_top">

        <Tabs />

        <GlobalBar />
        
      </div>
      <div className="tab_content">
        {children}
      </div>
      
    </div>
  )
}

export default CenterPanel;
