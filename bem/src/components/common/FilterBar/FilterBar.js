import React from 'react';
import styled from 'styled-components';
import { Search } from 'carbon-components-react';
import TileSizeSelect from './TileSizeSelect';
import LayoutSelect from './LayoutSelect';
import { DASHBOARD_LAYOUT_TYPE } from 'appConstants';
// import RowHeightSelect from './RowHeightSelect';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 35px;
  align-items: center;

  .bx--search-close {
    display: none
  }
`;

const StyledSearchbox = styled(Search)`
  width: 200px !important;

  .bx--search-input {
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.29;
    letter-spacing: normal;
    text-align: left;
    height: 32px;
  }
`;

const LeftContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PopupWrapper = styled.div`
  margin-right: 75px;
`;

const FilterBar = ({
  setTileSize,
  setLayoutType,
  tileSize,
  layoutType,
  rowHeight,
  setRowHeight,
  disableSearch,
  handleChangeText,
  filterKeyword
}) => {

  return (
    <Container>
      {disableSearch ? <div/> : (
        <StyledSearchbox
          value={filterKeyword}
          placeHolderText="Search"
          labelText="Search"
          size="sm"
          onChange={e => handleChangeText(e.target.value)}
        />
      )}
      <LeftContent>
        <PopupWrapper>
          { layoutType === DASHBOARD_LAYOUT_TYPE.GRID &&
            <TileSizeSelect setTileSize={setTileSize} tileSize={tileSize} />
          }
          {/* { layoutType === DASHBOARD_LAYOUT_TYPE.TABLE &&
            <RowHeightSelect setRowHeight={setRowHeight} rowHeight={rowHeight} />
          } */}
        </PopupWrapper>
        <LayoutSelect setLayoutType={setLayoutType} layoutType={layoutType} />
      </LeftContent>
    </Container>
  )
}

export default FilterBar;
