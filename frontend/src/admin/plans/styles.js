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
            width: '15%'
        },
        startDay: {
            width: '10%'
        },
        endDay: {
            width: '10%'
        },
        events: {
            width: '20%'
        },
        guide: {
            width: '15%'
        },
        cost: {
            width: '15%'
        },
        action: {
            width: '10%'
        }
    }
};
export default styles;