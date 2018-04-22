import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PageBase from '../../components/page-base';
import ContentSave from 'material-ui/svg-icons/content/save';
import DatePicker from 'material-ui/DatePicker';
import AvNotInterested from 'material-ui/svg-icons/av/not-interested';
import PlanningMap from '../../components/planning/PlanningMap';
import PlanningList from '../../components/planning/PlanningList';
import {Link} from 'react-router-dom';
import {loggedIn} from "../../components/authentication/oauth";
import styles from './styles';
import axios from "axios/index";

class MyPlanForm extends Component {

    url_backend = process.env.REACT_APP_BACKEND_URL + "api/plan/";

    constructor(props) {
        super(props);
        let arr = this.props.location.pathname.split('/');
        this.state = {
            accessToken: loggedIn(),
            name: arr[3] ? arr[3] : "",
        };
    }

    async componentDidMount() {
        if (this.state.accessToken) {
            let response = await axios.get(this.url_backend+this.state.name);

            let dayEvents = [];
            let dayEvent = {
                index: undefined,
                day: undefined,
            };
            response.data.events.map(function (event, index) {
                if(dayEvent.day !== event['start-time'].substr(0,10)) {
                    dayEvent = {
                        index: index,
                        day: event['start-time'].substr(0,10),
                    };
                    dayEvents.push(dayEvent)
                }
            });

            console.log(response.data);

            this.setState({
                id: response.data.id,
                'start-day': response.data['start-day'],
                'end-day': response.data['end-day'],
                events: response.data.events,
                dayEvents: dayEvents
            });
        }
    };

    addEvent = (event) => {
        let dayEvents = [];
        let dayEvent = {
            index: undefined,
            day: undefined,
        };
        let events = [...this.state.events, event];

        events.map(function (event, index) {
            if(dayEvent.day !== event['start-time'].substr(0,10)) {
                dayEvent = {
                    index: index,
                    day: event['start-time'].substr(0,10),
                };
                dayEvents.push(dayEvent)
            }
        });

        this.setState({
            events: events,
            dayEvents: dayEvents
        });
    };

    savePlan = () => {
        if (this.state.name === "") {
            this.setState({
                nameErrorMessage: "This field is required"
            });
            return;
        }
        this.props.save(this.state);

    };

    onNameChange = (event) => {
        this.setState({
            name: event.target.value,
            nameErrorMessage: undefined
        });
    };

    onStartDayChange = (event, value) => {
        this.setState({
            'start-day': value.toISOString().substr(0, 10),
        });
    };

    onEndDayChange = (event, value) => {
        this.setState({
            'end-day': value.toISOString().substr(0, 10),
        });
    };

    render() {
        console.log(this.state);
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
                                    <div className="col-md-4 col-sm-12 col-xs-12">
                                        <PlanningList data={this.state.events}
                                                      dayEvents={this.state.dayEvents}
                                                      addEvent={this.addEvent}/>
                                    </div>
                                    <div className="col-md-8 col-sm-12 col-xs-12" style={styles.map}>
                                        <PlanningMap data={this.state.events}/>
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