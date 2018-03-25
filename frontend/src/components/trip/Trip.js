import React, { Component } from 'react';
import ReactMapboxGl from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoidGluYXBoYW0xODAyIiwiYSI6ImNqZDE1NWJyNTE3b3kycW13YWRodTN1aWgifQ.gLyHvw0oKcf5SDOvDy439Q'
});

class Trip extends Component {

  constructor() {
    super();
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }
    };
  }

  render() {
    return (
      <Map style="mapbox://styles/mapbox/streets-v8"/>
    );
  }
}

export default Trip;
