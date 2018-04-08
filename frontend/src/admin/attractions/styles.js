import {blue600} from 'material-ui/styles/colors';

const styles = {
  usersDiv: {
    overflowX: 'auto !important',
  },
  table: {
    tableLayout: 'auto !important',
  },
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
      width: '1%'
    },
    name: {
      width: '12%'
    },
    lat: {
      width: '10%'
    },
    description: {
      width: '15%'
    },
    action: {
      width: '15%'
    }
  }
};
export default styles;