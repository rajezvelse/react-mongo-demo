import * as React from 'react';
import './toolbar.scss';
import { AppBar, Toolbar as MaterialToolbar, Typography, Avatar } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

//--
import appLogo from 'src/assets/images/logo.png';


class Toolbar extends React.Component<any, any>  {


  public render() {

    return (
      <div>
        <AppBar position="static">
          <MaterialToolbar className="toolbar">
            <Avatar variant="square" src={appLogo} className="toolbar-app-logo"></Avatar>
            <Typography className="toolbar-app-title">Ticket Tracking</Typography>

            {/* Nav links */}
            <div className="toolbar-links">
              <NavLink to="/tickets" activeClassName="active">Tickets</NavLink>
            </div>
          </MaterialToolbar>
        </AppBar>
      </div>
    );
  }
}

export default Toolbar;
