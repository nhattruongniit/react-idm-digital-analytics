import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

// rootReducers;
import rootReducers from './rootReducers';

// config redux dev tool
const composeEnhancers = process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
