import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import axios from 'axios';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles.scss';
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';
import Container from '../containers/Container/index';
import Error from '../components/error404/Error.js';
import AttractionPage from './containers/AttractionPage';
import AttractionFormPage from './containers/AttractionFormPage';
import PlanFormPage from './containers/PlanFormPage';
import UserPage from './containers/UserPage';
import {loggedIn} from "../components/authentication/oauth";
import PlanPage from "./containers/PlanPage";

injectTapEventPlugin();

class Admin extends Component {

    url_backend = process.env.REACT_APP_BACKEND_URL + "admin/api/";
    url = [this.url_backend + "user/", this.url_backend + "user/getEmail",
          this.url_backend + "attraction/", this.url_backend + "plan/"];

  constructor() {
    super();
    this.state = {
      dataUsers: [],
      dataAttractions: [],
      dataPlans: [],
      email: null,
      accessToken: loggedIn(),
      isAdmin: false
    };
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
      console.log(data[1].data);
      this.setState({
        isAdmin: !!data[0].data,
        dataUsers: data[0].data,
        email: data[1].data,
        dataAttractions: data[2].data,
        dataPlans: data[3].data
      });
    } else {
      axios.defaults.headers.common = undefined;
    }
  }

  async updateAttraction(id, data) {
    let response = await axios({
      method: 'put',
      url: this.url[2] + id,
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
      url: this.url[2],
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
      url: this.url[3] + id,
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
      url: this.url[3],
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
      url: this.url[0] + id
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
      url: this.url[2] + id
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
      url: this.url[3] + id
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
          this.props.isAdmin
            ? < Container isAdmin={this.state.isAdmin} email={this.state.email}>
              <Switch>
                <Route exact path={this.props.match.url}
                       render={(props) => <AttractionPage data={this.state.dataAttractions}
                                                          delete={this.deleteAttraction}{...props} />}  />
                <Route path={`${this.props.match.url}/plans`}
                       render={(props) => <PlanPage data={this.state.dataPlans}
                                                    delete={this.deletePlan} {...props} />} />
                <Route path={`${this.props.match.url}/plan-form`}
                       render={(props) => <PlanFormPage updateData={this.updatePlan} save={this.savePlan}
                                                        attractions={this.state.dataAttractions} {...props} />} />
                <Route path={`${this.props.match.url}/attractions`}
                       render={(props) => <AttractionPage data={this.state.dataAttractions}
                                                          delete={this.deleteAttraction}{...props} />} />
                <Route path={`${this.props.match.url}/attraction-form`}
                       render={(props) => <AttractionFormPage updateData={this.updateAttraction}
                                                              save={this.saveAttraction} {...props} />} />
                <Route path={`${this.props.match.url}/users`}
                       render={(props) => <UserPage data={this.state.dataUsers}
                                                    delete={this.deleteUser}{...props} />}/>
                <Route path="*" component={Error} />
              </Switch>
            </Container >
            : undefined
        }
      </div>
    );
  }
}

export default Admin;