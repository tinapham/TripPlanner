import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PageBase from '../../components/page-base';
import ContentSave from 'material-ui/svg-icons/content/save';
import DatePicker from 'material-ui/DatePicker';
import AvNotInterested from 'material-ui/svg-icons/av/not-interested';
import GoogleMap from '../../components/google-map';
import {Link} from 'react-router-dom';
import Divider from 'material-ui/Divider';
import styles from './styles';

class MyPlanForm extends Component {

    constructor(props) {
        super(props);
        let arr = this.props.location.pathname.split('/');
        this.state = {
            name: arr[3] ? arr[3] : "",
        };
    }

    savePlan = () => {
        if (this.state.name === "") {
            this.setState({
                nameErrorMessage: "This field is required"
            });
            return;
        }
        this.props.save(this.state);

    }

    onNameChange = (event) => {
        this.setState({
            name: event.target.value,
            nameErrorMessage: undefined
        });
    }

    onStartDayChange = (event, value) => {
        this.setState({
            'start-day': value.toISOString().substr(0, 10),
        });
    }

    onEndDayChange = (event, value) => {
        this.setState({
            'end-day': value.toISOString().substr(0, 10),
        });
    }

    render() {
        let startDay = this.state['start-day'] ? new Date(this.state['start-day']) : undefined;
        let endDay = this.state['end-day'] ? new Date(this.state['end-day']) : undefined;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <PageBase title="My plan">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <TextField
                                        id="name"
                                        name="name"
                                        floatingLabelText="Name"
                                        fullWidth={true}
                                        type="text"
                                        hintText="eg: Summer Trip, ..."
                                        value={this.state.name}
                                        onChange={this.onNameChange}
                                        ref="name"
                                        errorText={this.state.nameErrorMessage}
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <DatePicker
                                        id="start-day"
                                        name="start-day"
                                        floatingLabelText="Start day"
                                        hintText="Start day"
                                        fullWidth={true}
                                        value={startDay}
                                        onChange={this.onStartDayChange}
                                        ref="start-day"
                                        errorText={this.state.errorMessage}
                                        openToYearSelection={true}
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <DatePicker
                                        id="end-day"
                                        name="end-day"
                                        floatingLabelText="End day"
                                        hintText="End day"
                                        fullWidth={true}
                                        value={endDay}
                                        onChange={this.onEndDayChange}
                                        ref="start-day"
                                        errorText={this.state.errorMessage}
                                        openToYearSelection={true}
                                    />
                                </div>

                                <div className="col-md-12 col-sm-12 col-xs-12" style={styles.map}>
                                    <div className="col-md-8 col-sm-12 col-xs-12" style={styles.map}>
                                        <GoogleMap/>
                                    </div>
                                    <div className="col-md-4 col-sm-12 col-xs-12">

                                    </div>
                                </div>

                                <div style={styles.buttons}>
                                    <Link to="/home/plans">
                                        <RaisedButton
                                            label="Cancel"
                                            icon={<AvNotInterested/>}
                                        />
                                    </Link>

                                    <RaisedButton label="Save"
                                                  onClick={this.savePlan}
                                                  style={styles.saveButton}
                                                  type="submit"
                                                  icon={<ContentSave/>}
                                                  secondary={true}/>
                                </div>
                            </div>
                        </PageBase>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyPlanForm;