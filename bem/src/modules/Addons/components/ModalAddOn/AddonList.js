import React from 'react';
import styled from 'styled-components';
import AddonItem from './AddonItem';

const Container = styled.div`
  padding: 20px;
  background: var(--cds-ui-background);
`;

const List = styled.div`
  padding: 20px;
  background: var(--cds-ui-background);
  height: 100%;
`;

const ItemWrapper = styled.div`
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const HeadingStyled = styled.div`
  color: var(--cds-text-02,#525252);
  text-transform: capitalize;
`

const AddonList = ({ visiableAddOns, typeAddon, nameCategory, installAddon }) => {
  let addons = [];
  if (typeAddon) {
    addons =  visiableAddOns[typeAddon][nameCategory];
  }

  return (
    <Container>
      {typeAddon && <HeadingStyled>{typeAddon} > {nameCategory}</HeadingStyled> }
      <List>
        {addons.length > 0 && addons.map(addon => (
          <ItemWrapper key={addon.id}>
            <AddonItem addon={addon} installAddon={installAddon} />
          </ItemWrapper>
        ))}
      </List>
    </Container>
  )
};

export default AddonList;

