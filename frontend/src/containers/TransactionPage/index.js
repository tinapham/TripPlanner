import React from 'react';
import Home from '../../views/home';

const TransactionPage = (props) => {
    return (
        <Home location={props.location} tourGuideData={props.data} save={props.save}/>
    );
};

export default TransactionPage;