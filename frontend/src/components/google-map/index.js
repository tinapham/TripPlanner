import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import App from './app';
import ReactDOM from "react-dom";
import GoogleMaps from 'google-maps';
import ('../scss/base.scss');

let GoogleMapsLoader = require('google-maps');

class GoogleMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            center: {
                lat: 16.0544,
                lng: 108.2022
            }
        }
    }

    componentDidMount(){
        GoogleMaps.LIBRARIES = ['places'];
        GoogleMaps.KEY='AIzaSyBoBn50H-U0yGXvxhZstPQANsCjDaQgbYE';
        GoogleMaps.load((google)=> {
            ReactDOM.render(<App mapService={google}/>,
                ReactDOM.findDOMNode(this));
        });
    }

    render() {
        console.log('ahihi', this.props);
        return (
            <div className="app" ref="app">
                {/*<Map google={this.props.google}*/}
                     {/*zoom={12}*/}
                     {/*initialCenter={this.state.center}*/}
                     {/*style={{*/}
                         {/*width: '98%',*/}
                         {/*margin: '0 auto'}}>*/}

                    {/*<Marker onClick={this.onMarkerClick}*/}
                            {/*name={'Current location'} />*/}
                    {/*<Marker*/}
                        {/*title={'The marker`s title will appear as a tooltip.'}*/}
                        {/*name={'SOMA'}*/}
                        {/*position={{lat: 16.0344, lng: 108.2022}} />*/}
                    {/*<Marker*/}
                        {/*name={'Dolores park'}*/}
                        {/*position={{lat: 16.0044, lng: 108.1022}} />*/}
                    {/*<Marker />*/}
                {/*</Map>*/}

                {/*<App mapService={this.props.google}/>*/}
            </div>

        );
    }
}

// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyBoBn50H-U0yGXvxhZstPQANsCjDaQgbYE',
// })(GoogleMap);

export default GoogleMap;