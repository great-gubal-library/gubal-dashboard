/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
import React from 'react';
import { TableHead, TableRow, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import SortToggle from './MaterialTableSortToggle';

const useStyles = makeStyles({})

const SortableTableHead = ({
  headerGroups, onSortingChange, onFilteringChange,
}) => {
  const classes = useStyles();
  return (
  <TableHead>
  {headerGroups.map((headerGroup) => (
    <TableRow key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column) => {
        const params = onSortingChange ? column.getSortByToggleProps() : undefined;
        const style = column.columnMaxWidth ? { width: column.columnMaxWidth } : undefined;
        return (
          <TableCell
            className={classes.head}
            key={`header-cell-${column.id}`}
            {...column.getHeaderProps(params)}
            style={style}
          >
            <SortToggle column={column}>
              {column.render('Header')}
            </SortToggle>
            <div>{onFilteringChange ? column.render('Filter') : null}</div>
          </TableCell>
        );
      })}
    </TableRow>
  ))}
  </TableHead>
  );
};

SortableTableHead.propTypes = {
  headerGroups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSortingChange: PropTypes.func,
  onFilteringChange: PropTypes.func,
};

SortableTableHead.defaultProps = {
  onSortingChange: null,
  onFilteringChange: null,
};

export default SortableTableHead;
