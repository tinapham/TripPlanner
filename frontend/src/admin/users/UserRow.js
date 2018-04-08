import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Delete from 'material-ui/svg-icons/action/delete';
import { grey200 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import styles from './styles';

class UserRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteUser = () => {
    this.handleClose();
    this.props.delete(this.props.data.id, (this.props.index - 1));
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.deleteUser}
      />,
    ];

    return (
      <TableRow key={this.props.index}>
        <TableRowColumn style={styles.columns.id}>{this.props.index}</TableRowColumn>
        <TableRowColumn style={styles.columns.email}>{this.props.data.email}</TableRowColumn>
        <TableRowColumn style={styles.columns.screenplays}>
          {this.props.data["screenplays"].map(function (screenplay, index) {
            return (
              <div key={index}>
                <p>{screenplay.name}</p>
              </div>
            )
          })}
        </TableRowColumn>
        <TableRowColumn style={styles.columns.action}>
          {
            this.props.index > 1 ?
              <a>
                <FloatingActionButton zDepth={0}
                                      mini={true}
                                      backgroundColor={grey200}
                                      iconStyle={styles.deleteButton}
                                      onClick={this.handleOpen}
                >
                  <Delete/>
                </FloatingActionButton>
                <Dialog
                  title="Confirm"
                  actions={actions}
                  modal={true}
                  open={this.state.open}
                >
                  Are you sure to delete?
                </Dialog>
              </a>
              : undefined
          }
        </TableRowColumn>
      </TableRow>
    )
  }

}

export default UserRow;
