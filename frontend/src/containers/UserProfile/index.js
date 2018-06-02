import React from 'react';
import UserProfile from '../../components/userProfile/index';

const UserInfoPage = (props) => {
    return (
        <UserProfile username={props.username}/>
    );
};

export default UserInfoPage;