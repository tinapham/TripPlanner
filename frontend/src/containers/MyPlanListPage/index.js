import React from 'react';
import MyPlanList from '../../views/my-plan-list';

const HomePage = (props) => {
    return (
        <MyPlanList location={props.location} data={props.data} delete={props.delete}/>
    );
};

export default HomePage;