import React from 'react';
import Plan from '../../views/plan';

const MyPlanPage = (props) => {
    return (
        <Plan location={props.location} save={props.save}/>
    );
};

export default MyPlanPage;