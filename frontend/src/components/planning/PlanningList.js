import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import CurrentEventCard from './CurrentEventCard';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import FormAddEvent from '../../components/planning/FormAddEvent';
import styles from "../../admin/plan-form/styles";

class PlanningList extends React.Component {

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

    loadSubHeader = (index) => {
        let current = this.props.dayEvents.find(function (element) {
            return element.index === index;
        });
        return current ? <Subheader>{current.day}</Subheader> : undefined
    };

    render() {
        const loadSubHeader = this.loadSubHeader;
        const addEvent = this.props.addEvent;
        const deleteEvent = this.props.deleteEvent;

        return (

            <Paper style={{maxHeight: 550, overflow: 'auto'}} zDepth={2}>
                <List>
                    {this.props.data ?
                        this.props.data.map(function (event, index) {
                            return (
                                <div key={index}>
                                    {loadSubHeader(index)}
                                    <ListItem>
                                        <CurrentEventCard data={event}
                                                          addEvent={addEvent}
                                                          deleteEvent={deleteEvent}/>
                                    </ListItem>
                                </div>
                            )
                        })
                        : undefined
                    }
                    <RaisedButton
                        label="Add New Event"
                        primary={true}
                        style={styles.buttonAdd}
                        onClick={this.handleOpen}
                        icon={<ContentAdd/>}
                        secondary={true}/>
                    <FormAddEvent open = {this.state.open} handleClose={this.handleClose} addEvent={this.props.addEvent}/>
                </List>
            </Paper>
        );
    }
}

export default PlanningList;