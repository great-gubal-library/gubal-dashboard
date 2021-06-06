import React from 'react';
import {
  TableCell, TableRow, CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  spinner: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  row: {
  },
  cell: {
    borderBottom: 'none',
  },
});

const Spinner = () => {
  const classes = useStyles();
  return (
    <TableRow className={classes.row}>
      <TableCell className={classes.cell}>
        <CircularProgress className={classes.spinner} />
      </TableCell>
    </TableRow>
  );
};

export default Spinner;
