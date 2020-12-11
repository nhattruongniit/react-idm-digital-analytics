import React from 'react';
import styled from 'styled-components';
import { Dropdown, Search } from 'carbon-components-react';
import { ADDON_PRICE_TYPES } from '../../constants';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Title = styled.div`
  font-size: 1.5rem;
  color: #5a6872;
  min-width: 190px;
  margin-left: 20px;
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
`;

const LeftFilter = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const RightFilter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledDropdown = styled(Dropdown)`
  width: 100px;
  background: white;
  margin-right: 10px;
  font-size: 0.9rem;
  box-shadow: none;

  .bx--list-box__menu-item,
  .bx--list-box__label {
    color: #5596e6;
    font-weight: normal;
    text-transform: uppercase;
    color: var(--cds-text-02,#525252);
  }
`;

const StyledSearchBox = styled(Search)`
  width: 170px;
`;

const addonPriceTypesOptions = ADDON_PRICE_TYPES.map(item => ({
  id: item,
  text: item
}));

const nameOptions = [
  {
    id: 'asc',
    text: 'A-Z'
  },
  {
    id: 'desc',
    text: 'Z-A'
  }
];

const releaseOptions = [
  {
    id: 'asc',
    text: 'Latest'
  },
  {
    id: 'desc',
    text: 'Oldest'
  }
];

const PanelHeader = () => {
  return (
    <Container>
      <Title>Add-ons</Title>
      <FilterBar>
        <LeftFilter>
          <StyledDropdown
            label="All"
            items={addonPriceTypesOptions}
            selectedItem={addonPriceTypesOptions[0]}
            onChange={value => console.log(value)}
            id="select-price-type-dropdown"
            itemToString={item => (item ? item.text : '')}
          />

          <StyledDropdown
            label="Name"
            items={nameOptions}
            selectedItem={nameOptions[0]}
            onChange={value => console.log(value)}
            id="select-addon-name-dropdown"
            itemToString={item => (item ? item.text : '')}
          />
        </LeftFilter>
        <RightFilter>
          <StyledDropdown
            label="Latest Release"
            items={releaseOptions}
            selectedItem={releaseOptions[0]}
            onChange={value => console.log(value)}
            id="select-addon-release-dropdown"
            itemToString={item => (item ? item.text : '')}
          />
          <StyledSearchBox placeHolderText="Search" labelText="Search" />
        </RightFilter>
      </FilterBar>
    </Container>
  );
};

export default PanelHeader;
