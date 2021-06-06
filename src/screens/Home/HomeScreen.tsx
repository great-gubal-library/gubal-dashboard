import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { styled } from '../../styles';
import { Layout } from '../../components/Layout';
import { ROUTES } from '../../constants';
import { IRoute } from '../../types';

const useStyles = makeStyles({
  rootBox: {
    display: 'grid',
    gridTemplateRows: 'auto',
    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    gridColumnGap: '2em',
    gridRowGap: '2em',
  },
  searchBox: {
    gridRow: 1,
    gridColumnStart: 1,
    gridColumnEnd: 3,
  },
  chartBox: {
    height: 'calc(100% - 56px)',
  }
});

const ListItemContainer = styled(Box)`
  display: flex;
  align-items: center;
  cursor: ${(props: ListItemContainerProps) => props.disabled ? "not-allowed" : "pointer"};
  min-height: 120px;
  border-radius: 8px;
  box-shadow: rgb(0 0 0 / 13%) 0px 0px 15px;
`;

const IconContainer = styled(Box)`
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 1rem;
  color: ${props => props.theme.colors.primaryDarkest};
`;

const CardTextContainer = styled(Box)`
  justify-content: center;
  align-items: start;
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.colors.primaryDarkest};
`;

interface MenuItemProps {
  route: IRoute;
  onClick: (href: IRoute['href']) => void;
  disabled: boolean | undefined;
}

interface ListItemContainerProps {
  disabled: boolean | undefined;
}

export interface HomeScreenProps {

}

const MenuItem: FC<MenuItemProps> = ({ route, onClick, disabled }) => {
  const onCardItemClick = () => {
    !disabled && onClick(route.href);
  };

  return (
    <ListItemContainer p={3} onClick={onCardItemClick} disabled={disabled}>
      { route.iconComponent ? <IconContainer><route.iconComponent fontSize="large" /></IconContainer> : null}
      <CardTextContainer>
        <Typography variant="h1" color="textPrimary">{route.name}</Typography>
        <Typography variant="caption" color="textPrimary">{route.description}</Typography>
      </CardTextContainer>
    </ListItemContainer>
  );
}

export const HomeScreen: FC<HomeScreenProps> = () => {
  const classes = useStyles();
  let history = useHistory();

  const onNavItemClick = (href: IRoute['href']) => {
    history.push(href)
  };

  return (
    <Layout headerText="Overview">
      <Box className={classes.rootBox}>
        {ROUTES.map(route => (
          route.name !== "Home" &&
          <MenuItem
            key={route.href}
            route={route}
            onClick={onNavItemClick}
            disabled={route.disabled}
          />
        ))}
      </Box>
    </Layout>
  )
};
