import React from 'react';

export interface RouteConfig {
    path: string;
    component:  React.ComponentType<any>,
    childRoutes?: Array<RouteConfig>,
    exact?: boolean
}