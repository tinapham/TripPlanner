import React from 'react';
import UserProfile from '../userProfile/UserProfile';

const UserInfoPage = (props) => {
    return (
        <UserProfile email={props.email}/>
    );
};

export default UserInfoPage;