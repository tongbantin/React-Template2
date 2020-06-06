import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom'
import PermanentDrawerLeft from './Layout2';
export default ({ component: Component, ...rest }) => (
    <>
        <Route {...rest} render={(props)=>(<>
            <PermanentDrawerLeft>
                <Component {...props}/>
            </PermanentDrawerLeft>
            </>) }
        />
    </>
)