import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class ExploreMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: this.props.lat ? this.props.lat : 16.0544,
                lng: this.props.lng ? this.props.lng : 108.2022
            },
            activeMarker: {},
            selectedPlace: {},
            showingInfoWindow: false
        }
    }

    onMarkerClick = (props, marker) => {
        let current = this.props.data.find(function(element) {
            return element.name === props.name;
        });
        this.props.setCurrent(current);

        this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true
        });
    };

    onInfoWindowClose = () => {

        this.props.setCurrent(undefined);

        this.setState({
            activeMarker: null,
            showingInfoWindow: false
        });
    };

    onMapClicked = () => {
        if (this.state.showingInfoWindow)
            this.setState({
                activeMarker: null,
                showingInfoWindow: false
            });
    };

    render() {
        const onMarkerClick = this.onMarkerClick;
        return (
            <Map google={this.props.google}
                 zoom={12}
                 initialCenter={this.state.center}
                 onClick={this.onMapClicked}
                 style={{
                     width: '100%',
                     margin: '0 auto'
                 }}>

                <Marker onClick={this.onMarkerClick}
                        name={'Current location'}
                        // icon={{
                        //     url: require('../../static/resources/image/marker/current_location.ico'),
                        // }}
                />

                {this.props.data ?
                    this.props.data.map(function (event, index) {
                        return (
                            <Marker
                                key={index}
                                title={event.name}
                                name={event.name}
                                onClick={onMarkerClick}
                                position={{lat: event.lat, lng: event.lng}}/>
                        )
                    })
                    : undefined
                }

                <InfoWindow
                    marker={this.state.activeMarker}
                    onClose={this.onInfoWindowClose}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBoBn50H-U0yGXvxhZstPQANsCjDaQgbYE',
})(ExploreMap);
