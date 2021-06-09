import React, { FC, ReactNode } from 'react';
import { Box, Grid } from '@material-ui/core';
import { styled } from '../../styles';
import { SideMenu } from '../SideMenu';
import { ScreenHeader } from './ScreenHeader';
import { IScreenAction } from '../../types/Navigation';

export interface LayoutProps {
  screenActions?: Array<IScreenAction>;
  backUrl?: string;
  header?: string;
  headerText?: string;
  overflow?: string;
  children?: ReactNode;
};

const LayoutContainer = styled.div`
  display: flex;
`;

const Content = styled(Grid)`
  background: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MainContentWrapper = styled(Box)`
  height: 100%;
  overflow: ${({ overflow }) => overflow}
`;

const Sidebar = styled(Grid)`
  background: ${(props) => props.theme.colors.headerBackground};
  height: 100vh;
  min-width: 250px;
`;

export const Layout: FC<LayoutProps> = ({
  headerText,
  screenActions,
  children,
  header,
  backUrl,
  overflow = 'auto'
}) => {
  return (
    <LayoutContainer>
      <Sidebar>
        <SideMenu />
      </Sidebar>
      <Content>
        {(screenActions?.length || headerText?.length) &&
          <ScreenHeader
            screenActions={screenActions}
            headerText={headerText}
            showBackButton={header === 'back'}
            backUrl={backUrl}
          />
        }
        <MainContentWrapper px={8} pt={2} pb={8} overflow={overflow}>
          {children}
        </MainContentWrapper>
      </Content>
    </LayoutContainer>
  );
};
