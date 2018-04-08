import React from 'react';
import '../Admin.css';
import PlanRow from './PlanRow';
import {Link} from 'react-router-dom';
import {Table, TableBody, TableHeaderColumn, TableRow} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500} from 'material-ui/styles/colors';
import PageBase from '../../components/page-base/PageBase';
import styles from './styles';


const PlanManagement = (props) => {
  return (
    <PageBase title="Plan Management" navigation="Application / Plans">

      <div className='dashboard'>
        <Link to="/admin/plan-form">
          <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
            <ContentAdd/>
          </FloatingActionButton>
        </Link>

        <Table>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={styles.columns.id}>#</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.displayTime}>Start day</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.screens}>End day</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.apps}>Events</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.action}>Action</TableHeaderColumn>
            </TableRow>
            {props.data.data.map(
              (element, index) => <PlanRow
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

export default PlanManagement;