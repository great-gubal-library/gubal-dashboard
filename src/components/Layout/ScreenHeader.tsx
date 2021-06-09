import React, { FC } from 'react';
import { Box, Button, Typography, makeStyles, IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { styled } from '../../styles';
import { IScreenAction } from '../../types/Navigation';
import { useHistory } from 'react-router-dom';

interface ScreenHeaderProps {
  screenActions?: Array<IScreenAction>;
  headerText?: string;
  showBackButton: boolean;
  backUrl?: string;
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
  justify-content: flex-start;
`;

const ButtonBox = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
`;

const ActionButton: FC<IScreenAction> = ({
  label,
  handler,
  disabled
}) => <Button variant="contained" disabled={disabled} onClick={handler}>{label}</Button>;

export const ScreenHeader: FC<ScreenHeaderProps> = ({ headerText, screenActions, showBackButton, backUrl }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleBackClick = () => {
    backUrl ? history.push(backUrl) : history.goBack()
  };

  return (
    <HeaderBox pl={4} pr={4} className={classes.root}>
      {showBackButton
        ? (
          <Box>
            <IconButton onClick={handleBackClick}>
              <ArrowBack />
            </IconButton>
          </Box>
        ) : null
      }
      <Typography variant="h1" color="textPrimary">{headerText}</Typography>
      <ButtonBox>
        {screenActions && (
          <>{screenActions.map(action => <ActionButton key={action.label} {...action} />)}</>
        )}
      </ButtonBox>
    </HeaderBox>
  );
};
