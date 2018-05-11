import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import styles from './styles';

class AttractionList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: 16.0544,
                lng: 108.2022
            }
        };
        this.onTileClick = this.onTileClick.bind(this);
    }

    onTileClick = (event) => {
        let current = this.props.data.find(function(element) {
            return element.name === event.target.name;
        });
        this.props.setCurrent(current);
    };

    render() {
        return (
            <div style={styles.root}>
                <GridList
                    cellHeight={200}
                    style={styles.gridList}
                    cols={1}
                    onClick={this.onTileClick}
                >
                    { this.props.data ?
                        this.props.data.map(function (event, index) {
                            return (
                                <GridTile
                                    key={index}
                                    title={event.name}
                                    subtitle={<span>Add: <b>{event.address}</b></span>}
                                    actionIcon={<IconButton><StarBorder color="white"/></IconButton>}

                                >
                                    <img src={require(`../../static/resources/image/attraction/${event.id}.jpg`)}
                                         name={event.name}
                                         alt={event.name}/>
                                </GridTile>
                            )})
                        : undefined
                    }
                </GridList>
            </div>
        )
    }
}

export default AttractionList;