import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import './styles.css';
//import App from './scenes/App/';

import store, { history } from './store';

const rootNode = props => (
  <Provider store={store}>
    <ConnectedRouter history={history}>{props.children}</ConnectedRouter>
  </Provider>
);

export default rootNode;
