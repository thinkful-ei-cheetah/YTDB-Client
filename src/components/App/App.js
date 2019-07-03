import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from '../Nav/Nav';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute';
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute';
import LoginRoute from '../../routes/LoginRoute/LoginRoute';
import LandingRoute from '../../routes/LandingRoute/LandingRoute';
import ChannelRoute from '../../routes/ChannelRoute/ChannelRoute';
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute';
import './App.css';

class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    const { hasError } = this.state

    return (
      <div className='App'>
        <Nav />
        <main>
          {hasError && (
            <p>There was an error! Oh no!</p>
          )}
        <Switch>
            <PublicOnlyRoute
            // set to Public for testing purposes
            // <PrivateRoute
            //
              exact
              path={'/'}
              component={LandingRoute}
            />
            <PrivateRoute
              path={'/channel'}
              component={ChannelRoute}
            />
            <PublicOnlyRoute
              path={'/register'}
              component={RegistrationRoute}
            />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginRoute}
            />
            <Route
              component={NotFoundRoute}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
