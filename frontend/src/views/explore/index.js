import React, {Component} from 'react';
import PageBase from '../../components/page-base';
import AttractionList from '../../components/explore/AttractionList';
import ExploreMap from '../../components/explore/ExploreMap';
import CurrentAttractionCard from '../../components/explore/CurrentAttraction';
import styles from './styles';
import {geolocated} from 'react-geolocated';

class Explore extends Component {

    constructor() {
        super();
        this.state = {
            currentAttraction: undefined,
        };
        this.addFavorite = this.addFavorite.bind(this);
        this.addFeedback = this.addFeedback.bind(this);
    }

    setCurrentAttraction = (current) => {
        this.setState({
            currentAttraction: current
        });
    };

    addFavorite = (id) => {
        this.props.addFavorite(id);
    };

    addFeedback = (data) => {
        this.props.addFeedback(this.state.currentAttraction.id, data);
        // console.log('ahihi');
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
                                            <AttractionList data={this.props.data} setCurrent={this.setCurrentAttraction}
                                                            addFavorite={this.addFavorite}/>
                                            : <CurrentAttractionCard attraction={this.state.currentAttraction}
                                                                     addFavorite={this.addFavorite}
                                                                     addFeedback={this.addFeedback}
                                                                     username={this.props.username}/>
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