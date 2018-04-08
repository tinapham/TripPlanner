import React from 'react';
import UserProfile from '../userProfile/index';

const UserInfoPage = (props) => {
    return (
        <UserProfile email={props.email}/>
    );
};

export default UserInfoPage;