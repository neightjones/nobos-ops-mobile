import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import { persistStore } from 'redux-persist';
import RootReducer from './rootReducer';

const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
  const { createLogger } = require('redux-logger');
  middlewares.push(createLogger());
}

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
);

export const store = createStore(
  RootReducer,
  enhancer,
);

// export const persistor = persistStore(store);