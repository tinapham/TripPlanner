import React  from 'react';
import './App.css';
import Container from '../Container/index';
import Error from '../../components/error404/Error.js';
import HomePage from '../HomePage';
import {Redirect, Route, Switch} from 'react-router-dom';
import {loggedIn} from "../../components/authentication/oauth";
import axios from "axios/index";

class App extends React.Component {

    url_backend = process.env.REACT_APP_BACKEND_URL + "api/";
    url = [this.url_backend + "attraction/", this.url_backend + "plan/"];

    constructor() {
        super();
        this.state = {
            accessToken: loggedIn(),
            isAdmin: false
        };
        this.savePlan = this.savePlan.bind(this);
    }

    async savePlan(data) {
        let response = await axios({
            method: 'post',
            url: this.url[1],
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=utf8"
            }
        });
        if (response.data === "SUCCESS") {
            window.location.href = "/";
        }
    }

    render(){
        return (
            <div className="App">
                {
                    this.state.accessToken
                        ? < Container isAdmin={this.state.isAdmin} email={this.state.email}>
                            <Switch>
                                <Route exact path={this.props.match.url}
                                       render={(props) => <HomePage save={this.savePlan}{...props} />}  />
                                <Route path="*" component={Error} />
                            </Switch>
                        </Container >
                        : <Redirect to='/login'/>
                }
            </div>
        );
    }

}
export default App;
