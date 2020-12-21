import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';

// components
import Tabs from './Tabs';
import BreadCrumb from './BreadCrumb';
import AddOn from './AddOn';

// selectors
import { isExpandDrawerSelector } from 'selectors/app.selector'

function CenterPanelBox({ children }) {
  const isExpandDrawer = useSelector(isExpandDrawerSelector);

  return (
    <CenterStyled isExpandDrawer={isExpandDrawer}>
      <div className="centerPanel_top">
        <Tabs />
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
    </CenterStyled>
  )
}

export default CenterPanelBox;

const CenterStyled = styled.div`
  margin-left: ${props => props.isExpandDrawer ? 304 : 48}px;
`
