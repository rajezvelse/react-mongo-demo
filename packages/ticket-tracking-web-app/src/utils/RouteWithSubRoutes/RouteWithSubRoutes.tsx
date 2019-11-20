import React from 'react';

import { Route } from 'react-router-dom';
import { RouteConfig } from '../../interfaces/route-config';

const RouteWithSubRoutes: React.FC<RouteConfig> = (route: RouteConfig) => {
  return (
    <>

    <Route
      path={route.path}
      exact={route.exact}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} childRoutes={route.childRoutes} />
      )}
    />
    </>
  );
}


export default RouteWithSubRoutes;
