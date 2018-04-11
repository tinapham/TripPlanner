import ActionTypes from '../actions/types';
import Actions from '../actions';
import wayPoint from './way-point';

var DEFAULTS = [];

const wayPoints = (state = DEFAULTS, action) => {

    switch (action.type) {
        case ActionTypes.ADD_WAY_POINT:
            return [
                ...state,
                wayPoint(undefined, action)
            ];
            break;
        case ActionTypes.REMOVE_WAY_POINT:
            return state.filter((wp)=> {
                return wp.id !== action.id
            });
        default:
            return state;
    }

};

export default wayPoints;