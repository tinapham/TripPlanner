import React from 'react';
import Explore from '../../views/explore';

const ExplorePage = (props) => {
    return (
        <Explore location={props.location} addFavorite={props.addFavorite} data = {props.data}
                    addFeedback={props.addFeedback} username={props.username}/>
    );
};

export default ExplorePage;