import React from 'react';
import {Card, CardHeader, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FormAddEvent from '../../components/planning/FormAddEvent';

class CurrentEventCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            data: this.props.data,
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    delete = () => {
        this.props.deleteEvent(this.props.data);
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data ) {
            this.setState({ data: this.props.data });
        }
    }

    render() {
        return (
            <Card>
                <CardHeader
                    avatar={require(`../../static/resources/image/attraction/${this.state.data.attraction.id}.jpg`)}
                    title={this.state.data.attraction.name}
                    subtitle={ 'from ' + this.state.data['start-time'].substr(10, 6) + ' to ' + this.state.data['end-time'].substr(10, 6)}
                />
                {/*<CardTitle title="Note"/>*/}
                {/*<CardText>*/}
                    {/*{this.props.data.attraction.description}*/}
                {/*</CardText>*/}
                <CardActions>
                    <FlatButton label="Edit" onClick={this.handleOpen}/>
                    <FlatButton label="Delete" onClick={this.delete}/>
                </CardActions>
                <FormAddEvent open = {this.state.open} handleClose={this.handleClose} data={this.state.data}
                              addEvent={this.props.addEvent}/>
            </Card>
        );
    }
}

export default CurrentEventCard;