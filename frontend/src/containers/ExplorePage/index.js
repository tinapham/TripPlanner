import React from 'react';
import Explore from '../../views/explore';

const ExplorePage = (props) => {
    return (
        <Explore location={props.location} data = {props.data} />
    );
};

export default ExplorePage;