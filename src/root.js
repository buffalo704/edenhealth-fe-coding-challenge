import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import reduxPromise from 'redux-promise';
import { Map, fromJS } from 'immutable';
import rootReducer from './reducers';

export const history = createHistory();
const logger = createLogger({
  level: 'log',
  stateTransformer: state => state.toJS()
});

const middlewares = [routerMiddleware(history), thunkMiddleware, reduxPromise];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default ({ children, initialState = Map({}) }) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>{children}</ConnectedRouter>
    </Provider>
  );
};
