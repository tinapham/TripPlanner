import React, { Component } from 'react';
import { View } from './getScreens'

class MultipleScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isChanged: true
        };
        this.resize = this.resize.bind(this);
    }

    resize() {
        this.setState({
            isChanged: !this.state.isChanged,
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    componentWillMount() {
        this.resize();
    }

    componentDidMount() {

        window.addEventListener("resize", this.resize);
    }
    componentWillUnmount() {

        window.removeEventListener("resize", this.resize);
    }

    render() {
        return (
            <div className="cell">
                {View(this.props.cols, this.props.rows, this.props.apps, this.state)}
            </div>
        );
    };
}

export default MultipleScreen;