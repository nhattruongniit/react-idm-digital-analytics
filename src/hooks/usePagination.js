import { useState } from 'react';

export default function usePagination() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  function onChangePage(value) {
    setPage(value.page);
    setPerPage(value.pageSize);
  }

  return { 
    page,
    perPage,
    onChangePage,
  }
}
