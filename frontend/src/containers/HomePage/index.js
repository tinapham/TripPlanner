import React from 'react';
import Home from '../../views/home';

const HomePage = (props) => {
    return (
        <Home location={props.location} save={props.save}/>
    );
};

export default HomePage;