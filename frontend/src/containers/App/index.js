import React from 'react';
import './styles.css';
import Container from '../Container/index';
import Error from '../../components/error404/index.js';
import HomePage from '../HomePage';
import ExplorePage from '../ExplorePage';
import {Redirect, Route, Switch} from 'react-router-dom';
import {loggedIn} from "../../components/authentication/oauth";
import axios from "axios/index";
import MyPlanPage from "../MyPlanPage";
import MyPlanListPage from '../MyPlanListPage';

class App extends React.Component {

    url_backend = process.env.REACT_APP_BACKEND_URL + "api/";
    url = [this.url_backend + "attraction/", this.url_backend + "plan/", this.url_backend + "tour-guide/"];

    constructor() {
        super();
        this.state = {
            accessToken: loggedIn(),
            isAdmin: false
        };
        this.savePlan = this.savePlan.bind(this);
        this.updatePlan = this.updatePlan.bind(this);
        this.deletePlan = this.deletePlan.bind(this);
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
                dataPlans: data[1].data,
                dataTourGuides: data[2].data
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
            if(window.location.href !== 'http://localhost:3000/home/plan') {
                //when create a new plan from dashboard => navigate to MyPlan
                window.location.href = 'plan/'+data.name;
            } else {
                //when create a new plan from My Plans => navigate back to My Plans
                window.location.href = 'plans';
            }
        }
    }

    async updatePlan(id, data) {
        let path = data.paymentToken ? this.url[1] + id + '/' + data.paymentToken : this.url[1] + id;

        let response = await axios({
            method: 'put',
            url: path,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=utf8"
            }
        });
        if (response.data === "SUCCESS") {
            window.location.href = '../plans';
        }
    }

    async deletePlan(id, position) {
        let response = await axios({
            method: 'delete',
            url: this.url[1] + id
        });
        if (response.data === "SUCCESS") {
            let dataPlans = this.state.dataPlans;
            dataPlans.splice(position, 1);
            this.setState({
                dataPlans: dataPlans
            });
        }
    }

    render() {
        // console.log(this.state);

        return (
            <div>
                {
                    this.state.accessToken
                        ? < Container isAdmin={this.state.isAdmin} email={this.state.email}>
                            <Switch>
                                <Route exact path={this.props.match.url}
                                       render={(props) => <HomePage save={this.savePlan} {...props} />}/>
                                <Route path={`${this.props.match.url}/dashboard`}
                                       render={(props) => <HomePage save={this.savePlan} {...props} />}/>
                                <Route path={`${this.props.match.url}/explore`}
                                       render={(props) => <ExplorePage {...props} data={this.state.dataAttractions}/>}/>
                                <Route path={`${this.props.match.url}/plan`}
                                       render={(props) => <MyPlanPage listTourGuide={this.state.dataTourGuides}
                                                                      save={this.savePlan}
                                                                      update={this.updatePlan}{...props} />}/>
                                <Route path={`${this.props.match.url}/plan/:name`}
                                       render={(props) => <MyPlanPage listTourGuide={this.state.dataTourGuides}
                                                                      save={this.savePlan}
                                                                      update={this.updatePlan}{...props} />}/>
                                <Route path={`${this.props.match.url}/plans`}
                                       render={(props) => <MyPlanListPage data={this.state.dataPlans}
                                                                          delete={this.deletePlan}/>}/>
                                <Route path={`${this.props.match.url}/transaction/plan/:id`}
                                       render={(props) => <MyPlanPage data={this.state.dataTourGuides}
                                                                          delete={this.deletePlan}/>}/>
                                <Route path={`${this.props.match.url}/transaction/:id`}
                                       render={(props) => <MyPlanPage data={this.state.dataTourGuides}
                                                                       delete={this.deletePlan}/>}/>
                                <Route path="*" component={Error}/>
                            </Switch>
                        </Container>
                        : <Redirect to='/login'/>
                }
            </div>
        );
    }

}

export default App;
