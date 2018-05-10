import React from 'react';
import AttractionForm from '../attraction-form';

const AttractionFormPage = (props) => {
  return (
      <AttractionForm location={props.location} update={props.updateData} save={props.save}/>
  );
};

export default AttractionFormPage;
