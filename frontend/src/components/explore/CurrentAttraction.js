import React from 'react';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const CurrentAttractionCard = (props) => (
    <Card>
        <CardMedia
            overlay={<CardTitle title={props.attraction.name}
                                subtitle={props.attraction.address} />}
        >
            <img src={require(`../../static/resources/image/attraction/${props.attraction.id}.jpg`)} alt="" />
        </CardMedia>
        <CardTitle title="Description"/>
        <CardText>
            {props.attraction.description}
        </CardText>
    </Card>
);

export default CurrentAttractionCard;