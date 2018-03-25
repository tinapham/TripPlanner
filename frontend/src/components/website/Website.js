import React, { Component } from 'react';

class Website extends Component {

  static getType() {
    return "Website";
  }

  render() {
    return (
      <div >
        <iframe
          title="website"
          src={this.props.params.url}
          scrolling="no"
          style={{
            width: 100 + '%', height: 100 + 'vh'
          }}
        />
      </div>
    )
  }
}

export default Website;