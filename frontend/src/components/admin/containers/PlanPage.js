import React from 'react';
import PlanManagement from '../plans/PlanManagement';

const PlanPage = (props) => {
  return (
    <div>
      <PlanManagement  data={props}/>
    </div>
  );
};
export default PlanPage;
