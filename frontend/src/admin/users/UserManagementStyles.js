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
      width: '5%'
    },
    email: {
      width: '35%'
    },
    screenplays: {
      width: '35%'
    },
    action: {
      width: '15%'
    }
  }
};
export default styles;