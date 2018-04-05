import React from 'react';
import PlanForm from '../plan-form/PlanForm';

const PlanFormPage = (props) => {
  return (
    <PlanForm location={props.location} attractions={props.attractions} update={props.updateData} save={props.save}/>
  );
};

export default PlanFormPage;
