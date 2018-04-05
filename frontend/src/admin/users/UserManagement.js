import React from 'react';
import UserRow from './UserRow';
import { Table, TableBody, TableHeaderColumn, TableRow } from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { pink500 } from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import FormAddUser from './FormAddUser';
import styles from './UserManagementStyles';

class UserManagement extends React.Component {
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

  render() {
    return (
      <PageBase title="Users List" navigation="Application / Users">
        <div style={styles.usersDiv}>
          <a>
            <FloatingActionButton style={styles.floatingActionButton}
                                  backgroundColor={pink500}
                                  onClick={this.handleOpen}>
              <ContentAdd />
            </FloatingActionButton>
            <FormAddUser open = {this.state.open} handleClose={this.handleClose}/>
          </a>

          <Table style={styles.table}>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={styles.columns.id}>#</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.email}>Email</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.screenplays}>Screen-plays</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.action}>Action</TableHeaderColumn>
              </TableRow>
              {this.props.data.data.map(
                (element, index) => <UserRow
                  key={index}
                  data={element}
                  delete={this.props.data.delete}
                  index={index + 1}
                />
              )}
            </TableBody>
          </Table>
        </div>
      </PageBase>
    );
  }
}

export default UserManagement;