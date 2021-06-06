/* eslint-disable react/prop-types */
import React from 'react';

import { TablePagination } from '@material-ui/core';

const MaterialTablePagination = ({
  gotoPage, totalCount, pageSize, page, setPageSize, labelRowsPerPage
}) => {
  const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
  };

  const handlePageChange = (e, pageIndex) => {
    gotoPage(pageIndex);
  };

  return (
    <TablePagination
      component="div"
      onChangePage={handlePageChange}
      onChangeRowsPerPage={handlePageSizeChange}
      page={page}
      rowsPerPage={pageSize}
      count={totalCount || 0}
      labelRowsPerPage={labelRowsPerPage}
      style={{width: "0px", overflow: "visible"}} // Hack to allow pagination to be aligned to left side
    />
  );
};

export default MaterialTablePagination;
