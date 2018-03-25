import React from 'react';
import './css/style.css';
import Banner from './images/banner.png';
import Logo from './images/mgm-logo.png';

const Error = () => {
    return (
        <div className="wrap">
            <img className="logo" alt="logo" src={Logo} />
            <div className="banner">
                <img src={Banner} alt="banner" />
            </div>
            <div className="page">
                <h2>Hey guys, we can't find that page!</h2>
            </div>
        </div>
    )
}
export default Error;
