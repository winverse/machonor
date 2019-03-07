import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import { Provider } from 'react-redux';
import { ServerStyleSheet } from 'styled-components';
import axios from 'axios';

import App from 'components/App';
import configureStore from 'store/configureStore';
import routeConfig from 'routeConfig';

const serverRender = async (ctx: any) => {
  // url 값 만들기
  const { url, path, origin } = ctx;
  const store = configureStore(); // 매 요청마다 스토어 생성

  const search = origin.indexOf('localhost');
  const baseURL = search > -1 ? 'http://localhost:4000' : origin;
  axios.defaults.baseURL = baseURL;

  const promises: any[] = [];
  routeConfig.every((route) => {
    const match = matchPath(path, route);
    if (match && route.preload) {
      const p = route.preload(store, match.params, ctx);
      promises.push(p);
    }
    return true;
  });

  try {
    await Promise.all(promises);
  } catch (e) {
    throw e;
  }
  const context = {};
  const sheet = new ServerStyleSheet();
  const styles = sheet.getStyleTags();

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter context={context} location={url} >
        <App />
      </StaticRouter>
    </Provider>,
  );
  return {
    html,
    styles,
    state: store.getState(),
  };
};

export default serverRender;