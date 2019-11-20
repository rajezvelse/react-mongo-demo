import * as React from 'react';
import uniqueId from 'lodash/uniqueId'
import { Switch, Route, Redirect, } from 'react-router-dom';

import { RouteConfig } from '../../interfaces/route-config';
import RouteWithSubRoutes from '../../utils/RouteWithSubRoutes';

class Tickets extends React.Component<any, any>  {
  public render() {
    return (
      <>
        <Switch>
          {/* Default redirection */}
          <Route exact path="/tickets">
            <Redirect to="/tickets/list" />
          </Route>

          {this.props.childRoutes.map((route: RouteConfig) =>
            <RouteWithSubRoutes key={uniqueId()} {...route}></RouteWithSubRoutes>
          )}
        </Switch>
      </>
    );
  }
}

export default Tickets;
