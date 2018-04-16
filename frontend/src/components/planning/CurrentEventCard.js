import React from 'react';
import {Card, CardHeader, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class CurrentEventCard extends React.Component {
    render() {
        return (
            <Card>
                <CardHeader
                    avatar={require(`../../static/resources/image/attraction/${this.props.data.attraction.id}.jpg`)}
                    title={this.props.data.attraction.name}
                    subtitle={ 'from ' + this.props.data['start-time'].substr(10, 6) + ' to ' + this.props.data['end-time'].substr(10, 6)}
                />
                {/*<CardTitle title="Note"/>*/}
                {/*<CardText>*/}
                    {/*{this.props.data.attraction.description}*/}
                {/*</CardText>*/}
                <CardActions>
                    <FlatButton label="Edit"/>
                    <FlatButton label="Delete"/>
                </CardActions>
            </Card>
        );
    }
}

export default CurrentEventCard;