import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Paper from 'material-ui/Paper';

class PlanningMap extends React.Component {

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
        // let current = this.props.data.find(function(element) {
        //     return element.attraction.name === props.name;
        // });

        this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true
        });
    };

    onInfoWindowClose = () => {

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
            <Paper style={{maxHeight: 550, overflow: 'auto'}} zDepth={2}>
                <Map google={this.props.google}
                     zoom={12}
                     initialCenter={this.state.center}
                     onClick={this.onMapClicked}
                     style={{
                         width: '100%',
                         margin: '0 auto'
                     }}>

                    {/*<Marker onClick={this.onMarkerClick}*/}
                    {/*name={'Current location'}*/}
                    {/*/>*/}

                    {this.props.data ?
                        this.props.data.map(function (event, index) {
                            return (
                                <Marker
                                    key={index}
                                    title={event.attraction.name}
                                    name={event.attraction.name}
                                    onClick={onMarkerClick}
                                    position={{lat: event.attraction.lat, lng: event.attraction.lng}}/>
                            )
                        })
                        : undefined
                    }

                    <InfoWindow
                        marker={this.state.activeMarker}
                        onClose={this.onInfoWindowClose}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <p>{this.state.selectedPlace.name}</p>
                        </div>
                    </InfoWindow>
                </Map>
            </Paper>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBoBn50H-U0yGXvxhZstPQANsCjDaQgbYE',
})(PlanningMap);
