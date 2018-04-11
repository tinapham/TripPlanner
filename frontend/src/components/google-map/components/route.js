import React from 'react';
import EditableText from  './core/editable-text';
import RouteInfo from  './route-info';
import WayPoints from  '../containers/way-points';
import AppBar from "./app-bar";

class Route extends React.Component {

    constructor(props) {
        super(props);
    }

    handleRouteNameChange(newName) {
        this.props.onNameChange(this.props.route.id, newName);
    }


    renderRouteName() {
        var route = this.props.route;
        return (
            <div className="route-name">
                <EditableText
                    onSave={this.handleRouteNameChange.bind(this)}
                    value={route.name}/>
            </div>
        )
    }

    render() {
        var route = this.props.route;
        return (
            <div className={'route'}>
                <AppBar/>
                <RouteInfo route={route}/>
                <WayPoints route={route} mapService={this.props.mapService}/>
            </div>
        )

    }
}

export default Route;