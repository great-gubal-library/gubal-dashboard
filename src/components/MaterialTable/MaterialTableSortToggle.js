/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import ArrowUp from '@material-ui/icons/ArrowUpward';
import ArrowDown from '@material-ui/icons/ArrowDownward';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  icon: {
    height: '18px',
    lineHeight: 1,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    fontWeight: 600,
  },
});

const SortToggle = ({ column, children }) => {
  const classes = useStyles();
  return (
    <span className={classes.title}>
      {children} {column.isSorted ? (column.isSortedDesc ? <ArrowDown className={classes.icon} /> : <ArrowUp className={classes.icon} />) : ''}
    </span>
  );
};

SortToggle.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string,
    isSorted: PropTypes.bool,
    isSortedDesc: PropTypes.bool,
    render: PropTypes.func,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default SortToggle;
