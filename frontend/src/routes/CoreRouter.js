import React  from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Error from '../components/error404/index';
import LoginPage from "../components/authentication/LoginPage";
import RegisterPage from "../components/authentication/RegisterPage";
import axios from "axios/index";
import {loggedIn} from "../components/authentication/oauth";
import Admin from "../admin/index";
import App from '../containers/App';
class CoreRouter extends React.Component{

    url_backend = process.env.REACT_APP_BACKEND_URL + "admin/api/";
    url = [this.url_backend + "user/"];

    constructor() {
        super();
        this.state = {
            data: [],
            email: null,
            accessToken: loggedIn(),
            isAdmin: false
        };
    }

    async componentDidMount() {
        if (this.state.accessToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.accessToken}`;
            let data = [];
            let promises = [];
            this.url.forEach(url => {
                let promise = axios.get(url);
                promises.push(promise);
            });
            await axios.all(promises)
                .then(axios.spread((...promises) => {
                    data = [...promises];
                }));
            this.setState({
                data: data[0].data,
                isAdmin: !!data[0].data
            });
        } else {
            axios.defaults.headers.common = undefined;
        }
    }

	render(){
        return (
            <Router>
                <Switch>
                    <Redirect exact from='/' to='/home'/>
                        <Route path="/home" render={(props) => <App accessToken={this.state.accessToken} {...props}/>}/>
                    {
                        this.state.isAdmin ?
                            <Route path='/admin'
                                   render={(props) => <Admin isAdmin={this.state.isAdmin} userData={this.state.data} {...props}/>}/>
                            : undefined
                    }
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/*" component={Error} />
                </Switch>
            </Router>
        );
	}
}

export default CoreRouter;