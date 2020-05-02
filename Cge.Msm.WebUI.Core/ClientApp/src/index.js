import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import configureStore from './store/configureStore';
import App from './App';
import './App.css'
import registerServiceWorker from './registerServiceWorker';
import { CookiesProvider } from 'react-cookie';
import './assets/css/animate.css';
import {Provider} from './contexts/context'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {maintheme} from './assets/theme'
// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

const rootElement = document.getElementById('root');

ReactDOM.render(
  <ThemeProvider theme={maintheme}>
      <Provider>
         <App />
      </Provider>
  </ThemeProvider>
    ,
  rootElement);

registerServiceWorker();
