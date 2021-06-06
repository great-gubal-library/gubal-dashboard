import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ROUTES } from './constants';
import { THEME } from './styles';
import { MUI_THEME } from './styles/muiTheme';
import stores from './stores/Stores';

const Routes = () => (
  <Switch>
    {ROUTES.map(route =>
      <Route
        key={route.href}
        path={route.href}
        component={route.component}
        exact
      />
    )}
  </Switch>
);

const App = () => {
  return (
    <div className="App">
      <Router>
        <MuiThemeProvider theme={MUI_THEME}>
          <ThemeProvider theme={THEME}>
            <Provider {...stores}>
              <Routes />
            </Provider>
          </ThemeProvider>
        </MuiThemeProvider>
      </Router>
    </div>
  );
};

export default App;
