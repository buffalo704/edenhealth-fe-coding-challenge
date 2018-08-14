import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';

import Overview from './Overview';

import Empty from '../../components/Empty';

import { UserActions } from '../../actions';
import { mapActionsToPropTypes } from '../../lib/util';

import './styles.css';

class Main extends Component {
  static propTypes = {
    actions: mapActionsToPropTypes(UserActions).isRequired,
  }

  logout = () => {
    const { actions } = this.props;
    actions.LOGOUT();
  }

  render() {
    return (
      <div className="Main">
        <div className="Main-content">
          <button onClick={this.logout}>Logout</button>

          <Switch>
            <Route path="/app" component={Overview} />
            <Route component={Empty} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({ user: state.get('user') }),
  dispatch => ({
    actions: bindActionCreators(UserActions, dispatch),
  }),
)(Main));
