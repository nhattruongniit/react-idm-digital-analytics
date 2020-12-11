import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';

//css
import "carbon-components/css/carbon-components.min.css";
import 'react-toastify/dist/ReactToastify.css';
import '../src/assets/css/grid-layout.css';
import '../src/assets/css/grid-resize.css';
import 'styles.css'
import 'themes.css'

import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

import store from './config/store';
import history from './config/history';
import { applicationInit } from './reducers/app';

toast.configure();
applicationInit()(store.dispatch, store.getState)

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <Router history={history}>
        <App key={1}/>
      </Router>
    </Provider>
  </React.Fragment>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
