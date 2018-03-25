import React from 'react';
import AttractionForm from '../attraction-form/AttractionForm';

const FormPage = (props) => {
  return (
    <AttractionForm location={props.location} update={props.updateData} save={props.save}/>
  );
};

export default FormPage;
