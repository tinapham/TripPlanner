import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import CurrentEventCard from './CurrentEventCard';

class PlanningList extends React.Component {

    loadSubHeader = (index) => {
        let current = this.props.dayEvents.find(function (element) {
            return element.index === index;
        });
        return current ? <Subheader>{current.day}</Subheader> : undefined
    };

    render() {
        const loadSubHeader = this.loadSubHeader;
        return (

            <Paper style={{maxHeight: 550, overflow: 'auto'}} zDepth={2}>
                <List>
                    {this.props.data ?
                        this.props.data.map(function (event, index) {
                            return (
                                <div key={index}>
                                    {loadSubHeader(index)}
                                    <ListItem>
                                        <CurrentEventCard data={event}/>
                                    </ListItem>
                                </div>
                            )
                        })
                        : undefined
                    }
                </List>
            </Paper>
        );
    }
}

export default PlanningList;