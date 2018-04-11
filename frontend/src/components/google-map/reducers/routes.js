import Immutable from 'immutable';
import  ActionTypes from '../actions/types';
import  Actions from '../actions';
import  route from './route';

let DEFAULTS = Immutable.List.of(route(undefined, Actions.addRoute(0)));

const routes = (state = DEFAULTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ROUTE:
            return state.push(route(undefined, action));
        case  ActionTypes.ADD_WAY_POINT_TO_ROUTE:
            return state;
        default:
            return state;
    }

};

export default routes;