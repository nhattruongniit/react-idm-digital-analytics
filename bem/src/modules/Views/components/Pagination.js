import React from 'react';
import Paging from '../../../components/common/PaginationCarbon';

const Pagination = ({ totalItems, getAllViewsByProjectId, currentPage, perPage, sortDirection, match }) => {
  const onChangePagination = value => {
    const { projectId } = match.params;
    getAllViewsByProjectId(projectId, value.page, value.pageSize, sortDirection)
  }

  return (
    <>
      <Paging totalItems={totalItems} currentPage={currentPage} perPage={perPage} onChangePagination={onChangePagination} />
    </>
  )
}

export default Pagination;