import React from 'react';

class Link extends React.Component {

    handleClick(e) {
        e.preventDefault();
        this.props.onClick();
    }

    render() {
        return (
            <a className={this.props.className} href="#" onClick={this.handleClick.bind(this)}>{this.props.children}</a>
        )
    }
}

export default Link;