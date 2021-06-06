import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import React, { FC } from 'react';
import { dateTimeString } from '../../utils/stringUtils';
import { Link } from 'react-router-dom';
import { styled } from '../../styles';

export interface StyledLinkProps {
  external?: boolean;
  to: any;
}

const StyledLink: FC<StyledLinkProps> = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.black}
`

export const CellRenderers = {
  link: (linkFn: (row: any) => string) => ({ cell, row: { original } }: any) =>
    <Typography variant="body1">
      <StyledLink to={linkFn(original)}>
        {cell.value}
      </StyledLink>
    </Typography>,

  linkExternal: (linkFn: (row: any) => string) => ({ cell, row: { original } }: any) =>
    <Typography variant="body1">
      <StyledLink external to={linkFn(original)}>
        {cell.value}
      </StyledLink>
    </Typography>,

  linkWrapper: (
    linkFn: (row: any) => string,
    cellRenderer: (data: any) => JSX.Element | string
  ) => (data: any) =>
      <StyledLink to={linkFn(data.row.original)}>
        {cellRenderer(data)}
      </StyledLink>,

  text: ({ cell }: any) =>
    <Typography variant="body1">{cell.value}</Typography>,

  textFn: (fn: (cell: any, row: any) => string) => ({ cell, row: { original } }: any) =>
    <Typography variant="body1">{fn(cell, original)}</Typography>,

  dateTime: ({ cell }: any) =>
    <Typography variant="body1">{
      cell.value ? dateTimeString(cell.value) : ''
    }</Typography>,

  boolean: (trueString: string, falseString: string) => ({ cell }: any) =>
    <Typography variant="body1">{cell.value === true ? trueString : falseString}</Typography>,

  editIcon: (linkFn: (row: any) => string) => ({ row: { original } }: any) =>
    <StyledLink to={linkFn(original)}>
      <IconButton aria-label="edit">
        <Edit />
      </IconButton>
    </StyledLink>,

  deleteIcon: (deleteFn: (row: any) => any) => ({ row: { original } }: any) =>
    <IconButton aria-label="delete" onClick={() => deleteFn(original)}>
      <Delete />
    </IconButton>
};
