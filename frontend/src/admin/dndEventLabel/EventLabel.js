import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
import flow from 'lodash/flow';
import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { green500, white } from 'material-ui/styles/colors';

const eventSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
        }
    },
}

const eventTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return
        }

        // Determine rectangle on event
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        // Determine mouse position
        const clientOffset = monitor.getClientOffset()

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }

        // Time to actually perform the action
        props.moveEvent(dragIndex, hoverIndex)

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex
    },
}

class EventLabel extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        moveEvent: PropTypes.func.isRequired,
    }
    state = {
        open: false,
    };
    handleRequestDelete = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        const {
            isDragging,
            connectDragSource,
            connectDropTarget,
            index,
            event,
            deleteEvent,
            onClick
		} = this.props
        const opacity = isDragging ? 0.3 : 1
        let name = event.attraction.name;
        const styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'inline-block',
                padding: '0.5% 0.5%',
            },
        };
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="OK"
                primary={true}
                onClick={() => deleteEvent(index)}
            />,
        ];
        return connectDragSource(
            connectDropTarget(
                <div style={{...styles.wrapper,opacity}}>
                    <Chip
                        labelColor={white}
                        backgroundColor={green500}
                        onRequestDelete={this.handleRequestDelete}
                        onClick={() => onClick(true, event)}
                        style={styles.chip}
                    >
                        {name}
                    </Chip>
                    <Dialog
                        title="Confirm"
                        actions={actions}
                        modal={true}
                        open={this.state.open}
                    >
                        Are you sure to delete?
                    </Dialog>
                </div>
            ),
        )
    }
}
export default flow(
    DropTarget(ItemTypes.EventLabel, eventTarget, connect => ({
        connectDropTarget: connect.dropTarget(),
    })),
    DragSource(ItemTypes.EventLabel, eventSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }))
)(EventLabel);
