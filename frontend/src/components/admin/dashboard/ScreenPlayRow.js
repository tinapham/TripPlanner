import React from 'react';
import { Link } from 'react-router-dom';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import Delete from 'material-ui/svg-icons/action/delete';
import { grey200 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import styles from './AdminManagementStyles';

class ScreenPlayRow extends React.Component {
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

  deleteScreenplay = () => {
    this.handleClose();
    this.props.delete(this.props.data.id, (this.props.index - 1));
  }

  render() {
    let appList = [];
    const location = {
      pathname: '/admin/form',
      state: { data: this.props.data }
    }
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.deleteScreenplay}
      />,
    ];

    return (
      <TableRow key={this.props.index}>
        <TableRowColumn style={styles.columns.id}>{this.props.index}</TableRowColumn>
        <TableRowColumn style={styles.columns.name}>{this.props.data.name}</TableRowColumn>
        <TableRowColumn style={styles.columns.displayTime}>{this.props.data["display-time"]}</TableRowColumn>
        <TableRowColumn style={styles.columns.screens}>
          {this.props.data["screens"].map(function (screen, index) {
            appList.push(screen.apps);
            return (
              <div key={index}>
                <p>{screen.type}</p>
                {
                  screen.apps.map(function (app, count) {
                    return <br key={count} />
                  })
                }
              </div>
            )
          })}
        </TableRowColumn>
        <TableRowColumn style={styles.columns.apps}>
          {appList.map(function (apps, index) {
            return (
              <div key={index}>
                {
                  apps.map(function (app, count) {
                    return <p key={count}>{app.type}</p>
                  })
                }
              </div>
            )
          })}
        </TableRowColumn>
        <TableRowColumn style={styles.columns.action}>
          <Link className="button" to={location} /*to={{ pathname: "admin/form", state: { data: props.data } }}*/>
            <FloatingActionButton zDepth={0}
              mini={true}
              backgroundColor={grey200}
              iconStyle={styles.editButton}>
              <ContentCreate />
            </FloatingActionButton>
          </Link>
          <a>
            <FloatingActionButton zDepth={0}
              mini={true}
              backgroundColor={grey200}
              iconStyle={styles.deleteButton}
              onClick={this.handleOpen}
              >
              <Delete />
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
        </TableRowColumn>
      </TableRow>
    )
  }

}

export default ScreenPlayRow;
