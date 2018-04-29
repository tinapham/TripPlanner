import React from 'react';
import { Link } from 'react-router-dom';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import Delete from 'material-ui/svg-icons/action/delete';
import { grey200 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import styles from './styles';

class PlanRow extends React.Component {
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
    const location = {
      pathname: '/admin/plan-form/',
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
        <TableRowColumn style={styles.columns.startDay}>{this.props.data["start-day"]}</TableRowColumn>
        <TableRowColumn style={styles.columns.endDay}>{this.props.data["end-day"]}</TableRowColumn>
        <TableRowColumn style={styles.columns.events}>
          {this.props.data["events"] ?
              this.props.data["events"].map(function (event, index) {
                return (
                <div key={index}>
                  <p>{event.attraction.name}</p>
                </div>
                )})
              : undefined
          }
        </TableRowColumn>
        <TableRowColumn style={styles.columns.action}>
          <Link className="button" to={location}>
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

export default PlanRow;
