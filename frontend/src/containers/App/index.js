import React  from 'react';
import './styles.css';
import Container from '../Container/index';
import Error from '../../components/error404/index.js';
import HomePage from '../HomePage';
import ExplorePage from '../ExplorePage';
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
        this.updatePlan = this.updatePlan.bind(this);
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
                dataAttractions: data[0].data,
                dataPlans: data[1].data
            });
        } else {
            axios.defaults.headers.common = undefined;
        }
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

    async updatePlan(id, data) {
        console.log(this.url[1]+id);
        let response = await axios({
            method: 'put',
            url: this.url[1] + id,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=utf8"
            }
        });
        if (response.data === "SUCCESS") {
            window.location.href = data.name;
        }
    }

    render(){
        return (
            <div>
                {
                    this.state.accessToken
                        ? < Container isAdmin={this.state.isAdmin} email={this.state.email}>
                            <Switch>
                                <Route exact path={this.props.match.url}
                                       render={(props) => <HomePage save={this.savePlan} {...props} />}  />
                                <Route path={`${this.props.match.url}/dashboard`}
                                       render={(props) => <HomePage save={this.savePlan} {...props} />} />
                                <Route path={`${this.props.match.url}/explore`}
                                       render={(props) => <ExplorePage {...props} data = {this.state.dataAttractions}/>} />
                                <Route path={`${this.props.match.url}/plan`}
                                       render={(props) => <MyPlanPage save={this.savePlan} update={this.updatePlan}{...props} />} />
                                <Route path={`${this.props.match.url}/plan/:name`}
                                       render={(props) => <MyPlanPage save={this.savePlan} update={this.updatePlan}{...props} />} />
                                <Route path="*" component={Error} />
                            </Switch>
                        </Container >
                        : <Redirect to='/login' />
                }
            </div>
        );
    }

}
export default App;
