import React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Delete from 'material-ui/svg-icons/action/delete';
import {grey200} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import { Link } from 'react-router-dom';
import styles from './styles';

class AttractionRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  deleteUser = () => {
    this.handleClose();
    this.props.delete(this.props.data.id, (this.props.index - 1));
  };

  render() {
    const location = {
      pathname: '/admin/attraction-form',
      state: { data: this.props.data }
    };
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
        <TableRowColumn style={styles.columns.name}>{this.props.data.name}</TableRowColumn>
        <TableRowColumn style={styles.columns.name}>{this.props.data.address.substring(0,10)}...</TableRowColumn>
        <TableRowColumn style={styles.columns.lat}>{this.props.data.lat}</TableRowColumn>
        <TableRowColumn style={styles.columns.lat}>{this.props.data.lng}</TableRowColumn>
        <TableRowColumn style={styles.columns.lat}>{this.props.data.type}</TableRowColumn>
        <TableRowColumn style={styles.columns.description}>{this.props.data.description.substring(0,10)}...</TableRowColumn>
        {/*<TableRowColumn style={styles.columns.description}>*/}
          {/*{this.props.data["screenplays"].map(function (screenplay, index) {*/}
            {/*return (*/}
              {/*<div key={index}>*/}
                {/*<p>{screenplay.name}</p>*/}
              {/*</div>*/}
            {/*)*/}
          {/*})}*/}
        {/*</TableRowColumn>*/}
        <TableRowColumn style={styles.columns.action}>
          <Link className="button" to={location}>
            <FloatingActionButton zDepth={0}
                                  mini={true}
                                  backgroundColor={grey200}
                                  iconStyle={styles.editButton}>
              <ContentCreate />
            </FloatingActionButton>
          </Link>
          {
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
          }
        </TableRowColumn>
      </TableRow>
    )
  }

}

export default AttractionRow;
