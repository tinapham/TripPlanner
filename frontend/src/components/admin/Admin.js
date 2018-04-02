import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles.scss';
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';
import App from './containers/App';
import Error from '../error404/Error.js';
import FormPage from './containers/FormPage';
import Dashboard from './containers/DashboardPage';
import AttractionPage from './containers/AttractionPage';
import AttractionFormPage from './containers/AttractionFormPage';
import PlanFormPage from './containers/PlanFormPage';
import UserPage from './containers/UserPage';
import UserProfilePage from './containers/UserProfilePage';

import {loggedIn} from "./authentication/oauth";
import PlanPage from "./containers/PlanPage";

injectTapEventPlugin();

class Admin extends Component {

    url_backend = process.env.REACT_APP_BACKEND_URL + "admin/api/";
    url = [this.url_backend + "screenplay/", this.url_backend + "user/", this.url_backend + "user/getEmail",
          this.url_backend + "attraction/", this.url_backend + "plan/"];

  constructor() {
    super();
    this.state = {
      data: [],
      dataUsers: [],
      dataAttractions: [],
      dataPlans: [],
      email: null,
      accessToken: loggedIn(),
      isAdmin: false
    };
    this.deleteScreenPlay = this.deleteScreenPlay.bind(this);
    this.updateScreenPlay = this.updateScreenPlay.bind(this);
    this.saveScreenPlay = this.saveScreenPlay.bind(this);
    this.updateAttraction = this.updateAttraction.bind(this);
    this.saveAttraction = this.saveAttraction.bind(this);
    this.updatePlan = this.updatePlan.bind(this);
    this.savePlan = this.savePlan.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.deleteAttraction = this.deleteAttraction.bind(this);
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
        data: data[0].data,
        isAdmin: !!data[1].data,
        dataUsers: data[1].data,
        email: data[2].data,
        dataAttractions: data[3].data,
        dataPlans: data[4].data
      });
    } else {
      axios.defaults.headers.common = undefined;
    }
  }

  async deleteScreenPlay(id, position) {
    let response = await axios({
      method: 'delete',
      url: this.url[0] + id
    });
    if (response.data === "SUCCESS") {
      let data = this.state.data;
      data.splice(position, 1);
      this.setState({
        data: data
      });
    }
  }

  async updateScreenPlay(id, data) {
    let response = await axios({
      method: 'put',
      url: this.url[0] + id,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf8"
      }
    });
    if (response.data === "SUCCESS") {
      window.location.href = "/admin";
    }
  }

  async saveScreenPlay(data) {
    let response = await axios({
      method: 'post',
      url: this.url[0],
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf8"
      }
    });
    if (response.data === "SUCCESS") {
      window.location.href = "/admin";
    }
  }

  async updateAttraction(id, data) {
    let response = await axios({
      method: 'put',
      url: this.url[3] + id,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf8"
      }
    });
    if (response.data === "SUCCESS") {
      window.location.href = "/admin/attractions";
    }
  }

  async saveAttraction(data) {
    let response = await axios({
      method: 'post',
      url: this.url[3],
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf8"
      }
    });
    if (response.data === "SUCCESS") {
      window.location.href = "/admin/attractions";
    }
  }

  async updatePlan(id, data) {
    let response = await axios({
      method: 'put',
      url: this.url[4] + id,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf8"
      }
    });
    if (response.data === "SUCCESS") {
      window.location.href = "/admin/plans";
    }
  }

  async savePlan(data) {
    let response = await axios({
      method: 'post',
      url: this.url[4],
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf8"
      }
    });
    if (response.data === "SUCCESS") {
      window.location.href = "/admin/plans";
    }
  }

  async deleteUser(id, position) {
    let response = await axios({
      method: 'delete',
      url: this.url[1] + id
    });
    if (response.data === "SUCCESS") {
      let dataUsers = this.state.dataUsers;
      dataUsers.splice(position, 1);
      this.setState({
        dataUsers: dataUsers
      });
    }
  }

  async deleteAttraction(id, position) {
    let response = await axios({
      method: 'delete',
      url: this.url[3] + id
    });
    if (response.data === "SUCCESS") {
      let dataAttractions = this.state.dataAttractions;
      dataAttractions.splice(position, 1);
      this.setState({
        dataAttractions: dataAttractions
      });
    }
  }

  async deletePlan(id, position) {
    let response = await axios({
      method: 'delete',
      url: this.url[4] + id
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
    return (
      <div>
        {
          this.state.accessToken
            ? < App isAdmin={this.state.isAdmin} email={this.state.email}>
              <Switch>
                <Route exact path={this.props.match.url} render={(props) => <Dashboard data={this.state.data}
                  delete={this.deleteScreenPlay} {...props} />} />
                <Route path={`${this.props.match.url}/dashboard`}
                  render={(props) => <Dashboard data={this.state.data}
                    delete={this.deleteScreenPlay} {...props} />} />
                <Route path={`${this.props.match.url}/plans`}
                       render={(props) => <PlanPage data={this.state.dataPlans}
                                                     delete={this.deletePlan} {...props} />} />
                <Route path={`${this.props.match.url}/plan-form`}
                       render={(props) => <PlanFormPage updateData={this.updatePlan} save={this.savePlan}
                                                        attractions={this.state.dataAttractions} {...props} />} />
                <Route path={`${this.props.match.url}/form`}
                  render={(props) => <FormPage updateData={this.updateScreenPlay} save={this.saveScreenPlay} {...props} />} />
                <Route path={`${this.props.match.url}/attractions`}
                       render={(props) => <AttractionPage data={this.state.dataAttractions}
                                                      delete={this.deleteAttraction}{...props} />} />
                <Route path={`${this.props.match.url}/attraction-form`}
                       render={(props) => <AttractionFormPage updateData={this.updateAttraction} save={this.saveAttraction} {...props} />} />
                {
                  this.state.isAdmin ?
                    <Route path={`${this.props.match.url}/users`} render={(props) => <UserPage data={this.state.dataUsers}
                                                                                           delete={this.deleteUser}{...props} />}/>
                    : <Route path={`${this.props.match.url}/profile`}
                             render={(props) => <UserProfilePage email={this.state.email} {...props}/>}/>
                }
                <Route path="*" component={Error} />
              </Switch>
            </App >
            : <Redirect to={`${this.props.match.url}/login`} />
        }
      </div>
    );
  }
}

export default Admin;