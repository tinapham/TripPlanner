import { blue600 } from 'material-ui/styles/colors';
const styles = {
    floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 25,
        bottom: 160,
        left: 'auto',
        position: 'fixed',
    },
    editButton: {
        fill: blue600
    },
    deleteButton: {
        fill: blue600
    },
    columns: {
        id: {
            width: '5%'
        },
        name: {
            width: '25%'
        },
        startDay: {
            width: '15%'
        },
        endDay: {
            width: '15%'
        },
        events: {
            width: '30%'
        },
        action: {
            width: '10%'
        }
    }
};
export default styles;