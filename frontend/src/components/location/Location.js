import React, { Component } from 'react';
import TogglePages from '../togglePages/TogglePages';
import Error from '../error404/Error';
import axios from 'axios';

class Location extends Component {

  dataUrl = process.env.REACT_APP_BACKEND_URL + "api/screenplay/";

  constructor(props) {
    super(props);
    this.state = {
      errorOccurred: false
    }
  }

  async componentDidMount() {
    try {
      let res = await axios.get(this.getUrl());
      if (typeof (res.data) === "object") {
        this.setState({
          data: res.data
        });
      }
      else {
        this.setState({ errorOccurred: true });
      }
    } catch (e) {
      this.setState({ errorOccurred: true });
    }
  }

  getUrl() {
    const defaultScreen = this.dataUrl + 'default';
    const url = window.location.href;
    const substring = "screenplay=";
    if (url.indexOf(substring) === -1) return defaultScreen;
    else {
      let params = this.getQueryVariable("screenplay");
      params = this.dataUrl + params;
      return params;
    }
  }

  getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) === variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    // console.log('Query variable %s not found', variable);
  }

  render() {
    const component = this.state.errorOccurred
      ? <Error />
      : this.state.data
        ? <TogglePages url={this.state.data} />
        : undefined;
    return (
      <div className="App">
        {component}
      </div>
    );
  }
}

export default Location;
