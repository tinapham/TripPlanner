import React, {Component} from 'react';
import PageBase from '../../components/page-base';
import AttractionList from '../../components/explore/AttractionList';
import ExploreMap from '../../components/explore/ExploreMap';
import CurrentAttractionCard from '../../components/explore/CurrentAttraction';
import styles from './styles';
import {geolocated} from 'react-geolocated';

class Explore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentAttraction: undefined,
        }
    }

    setCurrentAttraction = (current) => {
        this.setState({
            currentAttraction: current
        });
    };

    render() {
        let lat = this.props.coords ? this.props.coords.latitude : null;
        let lng = this.props.coords ? this.props.coords.longitude : null;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <PageBase title="Explore Da Nang">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <br/>
                                <div className="col-md-4">
                                    {
                                        ! this.state.currentAttraction ?
                                            <AttractionList data={this.props.data} setCurrent={this.setCurrentAttraction}/>
                                            : <CurrentAttractionCard attraction={this.state.currentAttraction}/>
                                    }

                                </div>
                                <div className="col-md-8" style={styles.map}>
                                    <ExploreMap data={this.props.data} attraction={this.state.currentAttraction}
                                                lat={lat} lng={lng} setCurrent={this.setCurrentAttraction}/>
                                </div>
                            </div>
                        </PageBase>
                    </div>
                </div>
            </div>
        )
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 1000,
})(Explore);