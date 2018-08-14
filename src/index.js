import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './scenes/App';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';

const render = Component => {
  ReactDOM.render(
    <AppContainer warnings={false}>
      <Component>
        <App />
      </Component>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Root);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Root', () => {
    render(Root);
  });
}

registerServiceWorker();
