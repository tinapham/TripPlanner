import React from 'react';
import MyPlanForm from '../../views/my-plan-form';

const MyPlanPage = (props) => {
    return (
        <MyPlanForm location={props.location} save={props.save} update={props.update}/>
    );
};

export default MyPlanPage;