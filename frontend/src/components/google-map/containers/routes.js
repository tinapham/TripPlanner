import   {connect} from  'react-redux';
import   Actions from  '../actions';
import   Routes from  '../components/routes';

const getActiveRoute = (state) => {
    if (state && state.routes) {
        return state.routes.find((r) => {
            return r.id === state.activeRouteID;
        });
    }
};

const mapStateToProps = (state, ownProps) => {

    return {
        routes: state.routes,
        activeRoute: getActiveRoute(state),
        mapService: ownProps.mapService,
        mapData: state.mapData
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: () => {
            dispatch(Actions.addRouteRequested())
        },
        onRemove: (id) => {
            dispatch(Actions.removeRoute(id))
        },
        onChangeRoute: (id) => {
            dispatch(Actions.changeActiveRoute(id))
        },
        onChangeRouteName: (routeId, newName) => {
            dispatch(Actions.changeRouteName(routeId, newName))
        }
    }
};

const RoutesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Routes);

export default RoutesContainer;
