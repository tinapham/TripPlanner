import React  from 'react';
import './App.css';
import Container from '../Container/index';
import Error from '../../components/error404/Error.js';
import HomePage from '../HomePage';
import {Redirect, Route, Switch} from 'react-router-dom';
import {loggedIn} from "../../components/authentication/oauth";
import axios from "axios/index";
import MyPlanPage from "../MyPlanPage";

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
            window.location.href = 'home/plan/'+data.name;
        }
    }

    render(){
        console.log(this.props.match);
        return (
            <div>
                {
                    this.state.accessToken
                        ? < Container isAdmin={this.state.isAdmin} email={this.state.email}>
                            <Switch>
                                <Route exact path={this.props.match.url}
                                       render={(props) => <HomePage save={this.savePlan}{...props} />}  />
                                <Route path={`${this.props.match.url}/dashboard`}
                                       render={(props) => <HomePage {...props} />} />
                                <Route path={`${this.props.match.url}/plan/:name`}
                                       render={(props) => <MyPlanPage {...props} />} />
                                <Route path="*" component={Error} />
                            </Switch>
                        </Container >
                        : <Redirect to={`${this.props.match.url}/login`} />
                }
            </div>
        );
    }

}
export default App;
