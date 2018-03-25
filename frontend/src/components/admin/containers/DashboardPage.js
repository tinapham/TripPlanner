import React from 'react';
import AdminManagement from '../dashboard/AdminManagement';

const DashboardPage = (props) => {
  return (
    <div>
      <AdminManagement  data={props}/>
    </div>
  );
};
export default DashboardPage;
