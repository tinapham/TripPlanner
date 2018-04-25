import React from 'react';
import {Card, CardHeader, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FormAddEvent from '../../components/planning/FormAddEvent';

class CurrentEventCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


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
                    <FlatButton label="Edit" onClick={this.handleOpen}/>
                    <FlatButton label="Delete"/>
                </CardActions>
                <FormAddEvent open = {this.state.open} handleClose={this.handleClose} data={this.props.data}/>
            </Card>
        );
    }
}

export default CurrentEventCard;