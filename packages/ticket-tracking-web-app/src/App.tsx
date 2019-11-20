import React from 'react';
import './App.scss';

import uniqueId from 'lodash/uniqueId';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import { RouteConfig } from './interfaces/route-config';
import RouteWithSubRoutes from './utils/RouteWithSubRoutes';
import { AppRoutes } from './routing';

import { apolloClient } from './config/apollo-client';
import Toolbar from './modules/toolbar';


const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        {/* Top menu */}
        <Toolbar />

        <Container maxWidth="xl" className="container">
          <Switch>
            {/* Default redirection */}
            <Route exact path="/">
              <Redirect to="/tickets" />
            </Route>

            {AppRoutes.map((route: RouteConfig) =>
              <RouteWithSubRoutes key={uniqueId()} {...route}></RouteWithSubRoutes>
            )}
          </Switch>
        </Container>

      </Router >
    </ApolloProvider>
  );
}

export default App;
