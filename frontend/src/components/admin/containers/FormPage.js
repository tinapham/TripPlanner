import React from 'react';
import ScreenPlayForm from '../forms/ScreenPlayForm';

const FormPage = (props) => {
  return (
    <ScreenPlayForm location={props.location} update={props.updateData} save={props.save}/>
  );
};

export default FormPage;
