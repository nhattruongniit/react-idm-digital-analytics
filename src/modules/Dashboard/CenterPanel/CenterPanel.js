import React from 'react'
import { useSelector } from 'react-redux';

// components
import Tabs from './Tabs';
import GlobalBar from './GlobalBar';
import BreadCrumb from './BreadCrumb';
import AddOn from './AddOn';

// selectors
import { isExpandDrawerSelector } from 'selectors/app.selector'

function CenterPanel({ children }) {
  const isExpandDrawer = useSelector(isExpandDrawerSelector);

  return (
    <div className="centerPanel_wrapper" style={{paddingLeft: !isExpandDrawer && '48px'}}>
      <div className="centerPanel_top">
        <Tabs />
        <GlobalBar />
      </div>
      <div className="tab_content">
        <div className="tab_content_top">
          <BreadCrumb />
          <AddOn />
        </div>
        <div className="clear" />
        <div>
          {children}
        </div>
      </div>
      
    </div>
  )
}

export default CenterPanel;
