import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo } from 'react';
import { useFilters, usePagination, useSortBy, useTable } from 'react-table';
import FilterField from './MaterialTableFilterField';
import TableHead from './MaterialTableHead';
import Pagination from './MaterialTablePagination';
import Spinner from './MaterialTableSpinner';


const useStyles = makeStyles({
  spinner: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  pagination: {
    backgroundColor: '#fff',
  },
  container: (props) => ({
    flexGrow: '1',
    width: 'unset',
    maxWidth: '100%',
    ...(props.maxWidth ? { width: '100%' } : {}),
    alignSelf: 'flex-start'
  }),
  table: (props) => ({
    width: 'unset',
    maxWidth: '100%',
    ...(props.maxWidth ? { width: '100%' } : {}),
  }),
  root: {
    width: '100%',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
});

const MaterialTable = ({
  data, columns, totalCount, onPageChange, onSortingChange, onFilteringChange,
  isLoading, defaultPage, defaultPageSize, paginationEnabled, fixed, maxWidth
}) => {
  const defaultColumn = useMemo(() => ({
    // Let's set up our default Filter UI
    Filter: FilterField,
  }), []);

  const plugins = [];
  const initialState = { pageIndex: defaultPage, pageSize: defaultPageSize };

  if (onFilteringChange) {
    plugins.push(useFilters);
    initialState.filters = [];
  }

  if (onSortingChange) {
    plugins.push(useSortBy);
    initialState.sortBy = [];
  }

  const classes = useStyles({ maxWidth });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    gotoPage,
    setPageSize,
    state: {
      sortBy, pageIndex, pageSize, filters,
    },
  } = useTable({
    data,
    columns,
    manualSortBy: !!onSortingChange,
    manualPagination: true,
    manualFilters: !!onFilteringChange,
    pageCount: totalCount,
    autoResetPage: false,
    defaultColumn,
    initialState,
  },
    ...plugins,
    usePagination);

  /**
   * When sorting changes..
   */
  useEffect(() => {
    if (onSortingChange && sortBy.length) onSortingChange({ sortBy });
  }, [onSortingChange, sortBy]);

  /**
   * When page / row count changes ..
   */
  useEffect(() => {
    if (onPageChange) onPageChange(pageIndex, pageSize);
  }, [pageIndex, pageSize, onPageChange]);

  /**
   * When filters change ..
   */
  useEffect(() => {
    if (onFilteringChange) onFilteringChange(filters);
  }, [filters, onFilteringChange]);

  const style = fixed ? { tableLayout: "fixed" } : undefined;

  return (
    <div className={classes.root}>
      <TableContainer className={classes.container} component={Paper}>
        <Table stickyHeader aria-label="sticky table" {...getTableProps()} className={classes.table} style={style}>
          <TableHead
            onFilteringChange={onFilteringChange}
            onSortingChange={onSortingChange}
            headerGroups={headerGroups}
          />
          <TableBody {...getTableBodyProps()}>
            {isLoading && <Spinner />}
            {!isLoading && rows.map(
              (row) => {
                prepareRow(row);
                return (
                  <TableRow hover key={row.id} {...row.getRowProps()}>
                    {
                      row.cells.map((cell) =>
                        <TableCell
                          key={`${cell.column.id}-${cell.row.id}`}
                          {...cell.getCellProps()}
                        >
                          {cell.render('Cell')}
                        </TableCell>
                      )
                    }
                  </TableRow>
                );
              },
            )}

          </TableBody>

        </Table>
      </TableContainer>
      {
        paginationEnabled ?
          <Pagination
            totalCount={totalCount}
            page={pageIndex}
            pageSize={pageSize}
            setPageSize={setPageSize}
            gotoPage={gotoPage}
            labelRowsPerPage={'Rows per page'}
            className={classes.pagination}
          /> : null
      }
    </div>
  );
};

MaterialTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  columns: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  onPageChange: PropTypes.func,
  onSortingChange: PropTypes.func,
  onFilteringChange: PropTypes.func,
  isLoading: PropTypes.bool,
  totalCount: PropTypes.number,
  defaultPage: PropTypes.number,
  defaultPageSize: PropTypes.number,
  paginationEnabled: PropTypes.bool.isRequired,
  fixed: PropTypes.bool,
  maxWidth: PropTypes.bool,
};

MaterialTable.defaultProps = {
  data: [],
  columns: [],
  onPageChange: null,
  onSortingChange: null,
  onFilteringChange: null,
  isLoading: false,
  totalCount: 0,
  defaultPage: 0,
  defaultPageSize: 10,
  paginationEnabled: true,
  fixed: false,
  maxWidth: false,
};

export default MaterialTable;
