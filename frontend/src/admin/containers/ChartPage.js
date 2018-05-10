import React from 'react';
import Chart from '../chart';

const ChartPage = (props) => {
  return (
    <Chart location={props.location} update={props.updateData} save={props.save}/>
  );
};

export default ChartPage;
