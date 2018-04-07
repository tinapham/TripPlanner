import React from 'react';
import PlanForm from '../../views/home';

const HomePage = (props) => {
    return (
        <PlanForm location={props.location} save={props.save}/>
    );
};

export default HomePage;