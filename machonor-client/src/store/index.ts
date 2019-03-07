import configureStore from './configureStore';

const preloadedState = (window as any).__PRELOADED_STATE__;

const store = configureStore(preloadedState);

export default store;
