import React from "react";
import styled from "styled-components";

import Pagination from "carbon-components-react/es/components/Pagination";

const DefaultPage = ({ totalItems, currentPage, perPage, onChangePagination }) => {
  return (
    <PagingStyled>
      <Pagination
        page={currentPage}
        totalItems={Number(totalItems)}
        pageSize={perPage}
        pageSizes={[10, 20, 50]}
        onChange={value => onChangePagination(value)}
      />
    </PagingStyled>
  );
};

export default DefaultPage;

const PagingStyled = styled.div`
  width: 100%;
  margin-top: 30px; 
`;
