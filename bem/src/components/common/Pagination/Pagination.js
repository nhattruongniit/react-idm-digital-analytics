import React from 'react';
import styled from 'styled-components';
import ItemPerPageSelect from './ItemsPerPageSelect';
import PageSelect from './PageSelect';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid var(--cds-ui-03,#e0e0e0);
  padding: 0;
  align-items: center;
  margin-top: 10px;
  height: 40px;
  min-height: 40px;    
  background-color: var(--cds-ui-01,#f4f4f4);
`;

const IdfObjectPagination = (props) => {
  const { totalPages, selectPage, ...itemPerPageProps } = props;
  const { itemsPerPage, totalItems, setItemsPerPage, ...pageSelectProps } = props;
  return (
    <Container>
      <ItemPerPageSelect {...itemPerPageProps} />
      <PageSelect {...pageSelectProps} />
    </Container>
  )
};

export default IdfObjectPagination;