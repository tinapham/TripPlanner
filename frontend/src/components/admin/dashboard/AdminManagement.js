import React from 'react';
import './AdminManagement.css';
import ScreenPlayRow from './ScreenPlayRow';
import {Link} from 'react-router-dom';
import {Table, TableBody, TableHeaderColumn, TableRow} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import styles from './AdminManagementStyles';


const AdminManagement = (props) => {
  return (
    <PageBase title="mgmScreens" navigation="Application / Dashboard">

      <div className='dashboard'>
        <Link to="/admin/form">
          <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
            <ContentAdd/>
          </FloatingActionButton>
        </Link>

        <Table>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={styles.columns.id}>#</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.displayTime}>Display Time</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.screens}>Screens</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.apps}>Apps</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.action}>Action</TableHeaderColumn>
            </TableRow>
            {props.data.data.map(
              (element, index) => <ScreenPlayRow
                key={index}
                data={element}
                delete={props.data.delete}
                index={index + 1}
              />
            )}
          </TableBody>
        </Table>
      </div>
    </PageBase>
  );
};

export default AdminManagement;