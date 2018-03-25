import React, { Component } from 'react';
import './Hamburg.css';

class Hamburg extends Component {
  
    constructor(props){
        super(props);
        this.state = {
        }
    }  

    render() {
        return (
            <div  className="hamburg">
                <h1>Welcome to Hamburg</h1>
                <img src="./images/hamburg.png" alt="Hamburg" />
            </div>
        );
  }
}

export default Hamburg;
