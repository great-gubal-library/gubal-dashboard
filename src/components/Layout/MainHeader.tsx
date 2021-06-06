import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box } from '@material-ui/core';
import { styled } from '../../styles';

export interface MainHeaderProps {

};

const MainHeaderBox = styled(Box)`
  color: #fff;
  height: ${props => props.theme.constants.headerHeight};
  background-color: ${props => props.theme.colors.headerBackground};
  display: flex; 
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  border-bottom: 1px solid ${props => props.theme.colors.headerBackground};
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
`;

const HomeLink = styled(Link)`
  display: flex; 
  align-items: center;
  text-decoration: none;
  color: ${props => props.theme.colors.secondary}
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

export const MainHeader: FC<MainHeaderProps> = () => {
  return (
    <MainHeaderBox pl={4} pr={4}>
      <HomeLink to="/">
        <PictureContainer>
          <img src="logo192.png" alt="icon" />
        </PictureContainer>
        <Typography variant="h4" color="secondary">Gubal Steward</Typography>
      </HomeLink>
    </MainHeaderBox>
  );
};
