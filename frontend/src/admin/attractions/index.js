import React from 'react';
import AttractionRow from './AttractionRow';
import { Table, TableBody, TableHeaderColumn, TableRow } from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { pink500 } from 'material-ui/styles/colors';
import PageBase from '../../components/page-base/index';
import styles from './styles';
import { Link } from 'react-router-dom';

class AttractionManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  render() {
    return (
      <PageBase title="Attraction List" navigation="Application / Attractions">
        <div style={styles.usersDiv}>
          <Link to="/admin/attraction-form">
            <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
              <ContentAdd/>
            </FloatingActionButton>
          </Link>

          <Table style={styles.table}>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={styles.columns.id}>#</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.name}>Address</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.lat}>Latitude</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.lat}>Longitude</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.lat}>Type</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.description}>Description</TableHeaderColumn>
                {/*<TableHeaderColumn style={styles.columns.description}>Comments</TableHeaderColumn>*/}
                <TableHeaderColumn style={styles.columns.action}>Action</TableHeaderColumn>
              </TableRow>
              {this.props.data.data.map(
                (element, index) => <AttractionRow
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

export default AttractionManagement;