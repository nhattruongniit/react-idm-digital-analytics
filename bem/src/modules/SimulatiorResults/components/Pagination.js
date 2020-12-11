import React from 'react';
import Paging from '../../../components/common/PaginationCarbon';

const Pagination = ({ totalItems, fetchFileSimulation, currentPage, perPage, match }) => {
  const onChangePagination = value => {
    const { simulatorId } = match.params;
    fetchFileSimulation(simulatorId, value.page, value.pageSize)
  }

  return (
    <>
      <Paging totalItems={totalItems} currentPage={currentPage} perPage={perPage} onChangePagination={onChangePagination} />
    </>
  )
}

export default Pagination;