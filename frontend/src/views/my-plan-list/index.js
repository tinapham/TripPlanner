import React, {Component} from 'react';
import PlanRow from './PlanRow';
import {Link} from 'react-router-dom';
import {Table, TableBody, TableHeaderColumn, TableRow} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500} from 'material-ui/styles/colors';
import PageBase from '../../components/page-base/index';
import styles from './styles';

class MyPlanList extends Component {

    render() {
        return (
            <PageBase title="My Plan List">

                <div className='dashboard'>
                    <Link to="/home/plan">
                        <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
                            <ContentAdd/>
                        </FloatingActionButton>
                    </Link>

                    <Table>
                        <TableBody displayRowCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn style={styles.columns.id}>#</TableHeaderColumn>
                                <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
                                <TableHeaderColumn style={styles.columns.startDay}>Start day</TableHeaderColumn>
                                <TableHeaderColumn style={styles.columns.endDay}>End day</TableHeaderColumn>
                                <TableHeaderColumn style={styles.columns.events}>Events</TableHeaderColumn>
                                <TableHeaderColumn style={styles.columns.action}>Action</TableHeaderColumn>
                            </TableRow>
                            {this.props.data ?
                                this.props.data.map(
                                    (element, index) => <PlanRow
                                        key={index}
                                        data={element}
                                        delete={this.props.delete}
                                        index={index + 1}
                                    />)
                                : undefined
                            }}
                        </TableBody>
                    </Table>
                </div>
            </PageBase>
        )
    }
}

export default MyPlanList;