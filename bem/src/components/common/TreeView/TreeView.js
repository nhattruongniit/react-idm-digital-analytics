import React from 'react';
import styled from 'styled-components';
import Group from './Group';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
`;

const TreeView = ({ categoryTree, selectItems }) => {

  function renderItem(item) {
    if (item.type === 'container') {
      return (
        <Group
          id={item.id}
          name={item.name}
          count={item.count}
          key={item.id}
        >
          {item.items.map(childItem => renderItem(childItem))}
        </Group>
      );
    }
    if (item.type === 'group') {
      return (
        <Group
          id={item.id}
          name={item.name}
          count={item.count}
          key={item.id}
          onSelect={() => selectItems(item.itemIds)}
        />
      );
    }
  }

  return (
    <>
      <Container>
        {categoryTree.map(item => renderItem(item))}
      </Container>
    </>
  );
};

export default TreeView;
