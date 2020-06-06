import React from 'react';
import RouteLayout1 from './components/template/RouteLayout1';
import {Home} from './components/Home/Home'
import {MyStep} from './components/Master/MutiForm'
import {Form} from './components/Master/Form'
import User from './components/Master/User'
import Login from './components/Login/Login';
import ErrorBoundary from './components/template/ErrorBoundary'
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom'
export default () => (
    <ErrorBoundary>
        <Router>
            <Route exact path='/' component={Login} />
            <RouteLayout1 path='/home' component={Home} />
            <RouteLayout1 path='/form' component={MyStep} />
            <RouteLayout1 path='/table' component={User} />
            <RouteLayout1 path='/form2' component={Form} />
        </Router>
    </ErrorBoundary>
);
