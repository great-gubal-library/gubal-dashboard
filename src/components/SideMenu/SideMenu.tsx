import React, { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { ROUTES } from '../../constants';
import { styled } from '../../styles';
import { IRoute } from '../../types/Navigation';

export interface SideMenuProps {
  
}

export interface SideMenuItemProps {
  route: IRoute;
  onClick: (href: IRoute['href']) => void;
  disabled: boolean | undefined;
}

export interface ListItemContainerProps {
  disabled: boolean | undefined;
}

const ListItemContainer = styled(Box)`
  display: flex;
  align-items: center;
  cursor: ${(props: ListItemContainerProps) => props.disabled ? "not-allowed" : "pointer"};
  background-color: ${(props) => props.theme.colors.headerBackground};
`;

const IconContainer = styled(Box)`
  justify-content: center;
  align-items: center;
  display: flex;
  padding-right: 0.5rem;
  color: ${props => props.theme.colors.white};
`;

const SideMenuList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0 1em;

  > li {

    cursor: pointer;
    border-bottom: 1px solid ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.white};

    &:hover {
      background-color: ${props => props.theme.colors.secondary};
    }
  }
`;

const HomeLink = styled(Link)`
  margin: 1em 1em 3em;
  display: flex; 
  align-items: center;
  text-decoration: none;
  color: ${props => props.theme.colors.secondary};
`

const PictureContainer = styled.div`
  height: 40px;
  width: 40px;
  margin-right: 16px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  border-radius: 100px;
  > * {
    width: 100%;
    height: 100%;
  }
`;

const SideMenuItem: FC<SideMenuItemProps> = ({ route, onClick, disabled }) => {
  const onListItemClick = () => {
    !disabled && onClick(route.href);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <ListItemContainer p={3} onClick={onListItemClick} disabled={disabled}>
      { route.iconComponent ? <IconContainer><route.iconComponent /></IconContainer> : null}
      <Typography variant="body2" color="secondary">{route.name}</Typography>
    </ListItemContainer>
  );
}

export const SideMenu: FC<SideMenuProps> = () => {
  let history = useHistory();

  const onNavItemClick = (href: IRoute['href']) => {
    history.push(href)
  };

  return (
    <SideMenuList>
      <HomeLink to="/">
        <PictureContainer>
          <img src="/logo192.png" alt="icon" />
        </PictureContainer>
        <Typography variant="h4" color="secondary">Gubal Steward</Typography>
      </HomeLink>
      {ROUTES.map(route => (
        route.name !== "Home" &&
        <SideMenuItem
          key={route.href}
          route={route}
          onClick={onNavItemClick}
          disabled={route.disabled}
        />)
      )}
    </SideMenuList>
  );
}
