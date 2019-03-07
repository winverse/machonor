import 'react-app-polyfill/ie11'; // For IE 11 support
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Root from './Root';

const renderApp = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('development');
    return ReactDOM.render(
      <Root />,
      document.getElementById('root') as HTMLElement,
    );
  }
  renderProductApp();
};

const renderProductApp = async () => {
  const getComponents: any[] = [];
  // const { pathname } = window.location;
  // routeConfig.forEach((route: any) => {
  //   const match = matchPath(pathname, route);
  //   if (!match) return;
  //   const { getComponent } = route.component;
  //   if (!getComponent) return;
  //   getComponents.push(getComponent());
  // });
  await Promise.all(getComponents);
  ReactDOM.hydrate(<Root />, document.getElementById('root') as HTMLElement);
};

renderApp();

declare const module: { hot: any };
if (module.hot) {
  module.hot.accept();
}