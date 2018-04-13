import React, {Component} from 'react';
import WayPointDetails from "./way-point-details";

import EditableText from './core/editable-text';
import Link from './core/link';

class WayPoint extends Component {

    componentWillUnmount() {
        this.autoComplete = null;
    }

    cacheWayPointDomElm(elm) {
        let google = this.props.mapService;
        if (elm) {
            this.autoComplete = new google.maps.places.Autocomplete(elm);
            this.autoComplete.addListener('place_changed', this.autoCompletePlaceChange.bind(this));
        }
    }

    handleWayPointNameChange(newName) {
        this.props.onNameChange(this.props.wayPoint.id, newName);
    }

    autoCompletePlaceChange() {
        this.handleWayPointNameChange(this.autoComplete.getPlace().formatted_address);
    }

    renderWayPointName() {
        return (
            <div className="way-point-name">
                <EditableText
                    edit={this.props.edit}
                    placeholder="Start typing a place name"
                    domElm={this.cacheWayPointDomElm.bind(this)}
                    onSave={this.handleWayPointNameChange.bind(this)}
                    value={this.props.wayPoint.name}/>
            </div>
        )
    }

    renderWayPointDetails() {
        return <WayPointDetails onClose={this.props.onDetailsClose}/>
    }

    render() {
        let {wayPoint} = this.props;
        return (
            <div className="way-point">
                {this.renderWayPointName()}
                <div className="cta">
                    <Link className="way-point-details" onClick={this.props.onDetailsOpen}>details</Link>
                    <Link className='insert-way-point' onClick={this.props.onAdd}>
                        <i className="icon-plus"/>
                    </Link>
                    <Link className='remove-way-point' onClick={this.props.onRemove}>
                        <i className="icon-minus"/>
                    </Link>
                </div>
                {wayPoint.detailsOpen? this.renderWayPointDetails() : null}
            </div>
        )
    }
}

export default WayPoint;