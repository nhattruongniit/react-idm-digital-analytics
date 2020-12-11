import React from 'react';
import Paging from '../../../components/common/PaginationCarbon';

const Pagination = ({ totalItems, fetchSimulations, currentPage, perPage, match, sortDirection }) => {
  const onChangePagination = value => {
    const { documentId } = match.params;
    fetchSimulations(documentId, value.page, value.pageSize, sortDirection)
  }

  return (
    <>
      <Paging totalItems={totalItems} currentPage={currentPage} perPage={perPage} onChangePagination={onChangePagination} />
    </>
  )
}

export default Pagination;