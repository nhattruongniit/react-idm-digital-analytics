import React from 'react'
import { useSelector } from 'react-redux';

// components
import Tabs from './Tabs';
import GlobalBar from './GlobalBar';

// selectors
import { isExpandDrawerSelector } from 'selectors/app.selector'

function CenterPanel({ children }) {
  const isExpandDrawer = useSelector(isExpandDrawerSelector);

  return (
    <div className="centerPanel_wrapper" style={{paddingLeft: !isExpandDrawer && '48px'}}>
      <div className="centerPanel_top" style={{width: !isExpandDrawer && 'calc(100vw - 64px)'}}>
        <Tabs />
        <GlobalBar />
      </div>
      <div className="tab_content" style={{ backgroundColor: '#161616'}}>
        <div>
          {children}
        </div>
      </div>
      
    </div>
  )
}

export default CenterPanel;
