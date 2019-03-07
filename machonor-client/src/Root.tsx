import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { hot } from 'react-hot-loader';

// import { IntlProvider, addLocaleData } from 'react-intl';
// import * as en from 'react-intl/locale-data/en';
// import * as ko from 'react-intl/locale-data/ko';
// import * as locale from 'locale';
// import storage from 'lib/storage';

// addLocaleData([...en, ...ko]);

import store from './store';
import App from './components/App';

const Root: React.SFC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;