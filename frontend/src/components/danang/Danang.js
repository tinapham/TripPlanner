import React, { Component } from 'react';
import './Danang.css';

class Danang extends Component {
    
    constructor(props){
        super(props);
        this.state = {
        }
    }  

    render() {
        return (
            <div  className="danang">
                <h1>Welcome to Danang</h1>
                <img src="./images/danang.png" alt="Danang" />
            </div>
        );
  }
  
}

export default Danang;
