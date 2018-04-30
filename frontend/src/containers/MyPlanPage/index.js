import React from 'react';
import MyPlanForm from '../../views/my-plan-form';

const MyPlanPage = (props) => {
    return (
        <MyPlanForm location={props.location} listTourGuide={props.listTourGuide} save={props.save} update={props.update}/>
    );
};

export default MyPlanPage;