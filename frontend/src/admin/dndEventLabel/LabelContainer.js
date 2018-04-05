import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch';
import EventLabel from './EventLabel'

class LabelContainer extends Component {
    constructor(props) {
        super(props)
        this.moveEvent = this.moveEvent.bind(this)
    }

    moveEvent(dragIndex, hoverIndex) {
        this.props.updateEvent(dragIndex, hoverIndex);
    }

    render() {
        const { events } = this.props
        return (
            <div>
                {events.map((event, i) => (
                    <EventLabel
                        key={event.id}
                        index={i}
                        id={event.id}
                        moveEvent={this.moveEvent}
                        event={event}
                        deleteEvent={this.props.deleteEvent}
                        onClick={this.props.onClick}
                    />
                ))}
            </div>
        )
    }
}
export default DragDropContext(MultiBackend(HTML5toTouch))(LabelContainer);