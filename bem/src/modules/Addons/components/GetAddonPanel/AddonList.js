import React from 'react';
import styled from 'styled-components';
import AddonItem from './AddonItem';

const Container = styled.div`
  padding: 20px;
  background: #F3F9FF;
`;

const List = styled.div`

`;

const ItemWrapper = styled.div`
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const AddonList = ({ addons, ...props }) => (
  <Container>
    <List>
      {addons.map(addon => (
        <ItemWrapper key={addon.id}>
          <AddonItem addon={addon} {...props} />
        </ItemWrapper>
      ))}
    </List>
  </Container>
);

export default AddonList;

