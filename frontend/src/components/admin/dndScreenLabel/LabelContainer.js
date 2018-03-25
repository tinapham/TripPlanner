import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch';
import ScreenLabel from './ScreenLabel'

class LabelContainer extends Component {
    constructor(props) {
        super(props)
        this.moveScreen = this.moveScreen.bind(this)
    }

    moveScreen(dragIndex, hoverIndex) {
        this.props.updateScreen(dragIndex, hoverIndex);
    }

    render() {
        const { screens } = this.props
        return (
            <div>
                {screens.map((screen, i) => (
                    <ScreenLabel
                        key={screen.id}
                        index={i}
                        id={screen.id}
                        moveScreen={this.moveScreen}
                        screen={screen}
                        deleteScreen={this.props.deleteScreen}
                        onClick={this.props.onClick}
                    />
                ))}
            </div>
        )
    }
}
export default DragDropContext(MultiBackend(HTML5toTouch))(LabelContainer);