import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from '../Nav/Nav';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute';
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute';
import LoginRoute from '../../routes/LoginRoute/LoginRoute';
import LandingRoute from '../../routes/LandingRoute/LandingRoute';
import ChannelRoute from '../../routes/ChannelRoute/ChannelRoute';
import AboutRoute from '../../routes/AboutRoute/AboutRoute';
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute';
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';
import './App.css';
class App extends Component {
  state = { hasError: false }

  static contextType = UserContext;

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount = async() => {
    if (TokenService.hasAuthToken() && !this.context.user.name) {
      let userInfo = await AuthApiService.getUserInfo()
      userInfo = {...this.context.user, ...userInfo}
      await this.context.setUser(userInfo);
    }
  }

  render() {
    const { hasError } = this.state

    return (
      <div className='App'>
        <Nav />
        <main>
          {hasError && <p className='form-error'>{hasError}</p>}
        <Switch>
            <PublicOnlyRoute
              exact
              path={'/'}
              component={LandingRoute}
            />
            <PublicOnlyRoute
              path={'/channel/:id'}
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
            <PrivateRoute
              path={'/dashboard'}
              component={DashboardRoute}
            />
            <Route
             path={'/about'}
              component={AboutRoute}
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