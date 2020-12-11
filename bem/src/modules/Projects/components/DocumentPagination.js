import React from 'react';
import Paging from '../../../components/common/PaginationCarbon';

const Pagination = ({ totalItems, fetchDocuments, currentPage, perPage, match, sortDirection }) => {
  const onChangePagination = value => {
    const { projectId } = match.params;
    fetchDocuments(projectId, value.page, value.pageSize, sortDirection)
  }

  return (
    <>
      <Paging totalItems={totalItems} currentPage={currentPage} perPage={perPage} onChangePagination={onChangePagination} />
    </>
  )
}

export default Pagination;