import React, { FC } from 'react';
import { Box, Button, Typography, makeStyles } from '@material-ui/core';
import { styled } from '../../styles';
import { IScreenAction } from '../../types/Navigation';

interface ScreenHeaderProps {
  screenActions?: Array<IScreenAction>;
  headerText?: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 32px'
  }
}));

const HeaderBox = styled(Box)`
  height: ${props => props.theme.constants.headerHeight};
  display: flex; 
  align-items: center;
  justify-content: space-between;
`;

const ButtonBox = styled(Box)`
  display: flex;
  justify-content: flex-end;
`;

const ActionButton: FC<IScreenAction> = ({
  label,
  handler,
  disabled
}) => <Button variant="contained" disabled={disabled} onClick={handler}>{label}</Button>;

export const ScreenHeader: FC<ScreenHeaderProps> = ({ headerText, screenActions }) => {
  const classes = useStyles();

  return (
    <HeaderBox pl={4} pr={4} className={classes.root}>
      <Typography variant="h1" color="textPrimary">{headerText}</Typography>
      <ButtonBox>
        {screenActions && (
          <>{screenActions.map(action => <ActionButton key={action.label} {...action} />)}</>
        )}
      </ButtonBox>
    </HeaderBox>
  );
};
