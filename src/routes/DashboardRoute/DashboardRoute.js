import React, { Component } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';

class DashboardRoute extends Component {
  render() {
    return (
      <Dashboard id={this.props.id}/>
    );
  }
}

export default DashboardRoute;