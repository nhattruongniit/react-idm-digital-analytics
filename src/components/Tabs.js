import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

// carbon icons
// import Close20 from "@carbon/icons-react/lib/close/20";
import Add20 from "@carbon/icons-react/lib/add/20";
import ChevronLeft24 from "@carbon/icons-react/lib/chevron--left/24";
import ChevronRight24 from "@carbon/icons-react/lib/chevron--right/24";

// selectors
import { isExpandDrawerSelector } from 'selectors/app.selector';

const tabsData = [1,2,3,4,5]

function Tabs() {
  const isExpandDrawer = useSelector(isExpandDrawerSelector);

  return (
    <TabWrapperStyled isExpandDrawer={isExpandDrawer} className="centerPanel_top">
      <ArrowStyled showArrow={tabsData.length > 6}>
        <ChevronLeft24 />
      </ArrowStyled>
      <TabsContentStyled isExpandDrawer={isExpandDrawer}>
        <div className="tabs_container">
          <div className="tabs_root">
            {tabsData.map(tab => (
              <div key={tab} className="tabs_item">
                <span>Workspace {tab} </span>
              </div>
            ))}
            <div className="tabs_add">
              <Add20 />
            </div>
          </div>
        </div>
      </TabsContentStyled>
      <ArrowStyled showArrow={tabsData.length > 6}>
        <ChevronRight24 />
      </ArrowStyled>
    </TabWrapperStyled>
    
  )
}

export default Tabs;

const TabWrapperStyled = styled.div`
  left: ${props => props.isExpandDrawer ? '303px' : '64px'}
`

const ArrowStyled = styled.div`
  display: ${props => props.showArrow ? 'block' : 'none'};
  @media (max-width: 1100px) {
    display: block;
  }
`

const TabsContentStyled = styled.div`
  display: flex;
  align-items: center;
  width: ${props => props.isExpandDrawer ? 'calc(100vw - 525px)' : 'calc(100vw - 125px)'}; 
  overflow-x: auto;


  &::-webkit-scrollbar-track {
    // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #393939;
  }

  &::-webkit-scrollbar {
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #393939;
    border: 2px solid #393939;
  }
`
