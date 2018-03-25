import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from '../admin/Admin';
import LoginPage from './authentication/LoginPage';
import RegisterPage from "./authentication/RegisterPage";

const Authentication = (props) => {
    return (
        <Switch>
            <Route path={`${props.match.url}/login`} component={LoginPage} />
            <Route path={`${props.match.url}/register`} component={RegisterPage} />
            <Route path={props.match.url} component={Admin} />
        </Switch>
    )
}
export default Authentication