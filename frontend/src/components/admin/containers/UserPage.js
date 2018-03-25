import React from 'react';
import UserManagement from '../users/UserManagement';

const UserPage = (props) => {
  return (
    <UserManagement  data={props}/>
  );
};
export default UserPage;
