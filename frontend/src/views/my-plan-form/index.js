import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import PageBase from '../../components/page-base';
import ContentSave from 'material-ui/svg-icons/content/save';
import DatePicker from 'material-ui/DatePicker';
import AvNotInterested from 'material-ui/svg-icons/av/not-interested';
import PlanningMap from '../../components/planning/PlanningMap';
import PlanningList from '../../components/planning/PlanningList';
import {Link} from 'react-router-dom';
import styles from './styles';
import {white, green600} from 'material-ui/styles/colors';
import axios from "axios/index";
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';

class MyPlanForm extends Component {

    url_backend = process.env.REACT_APP_BACKEND_URL + "api/plan/";

    constructor(props) {
        super(props);
        let arr = this.props.location.pathname.split('/');
        this.state = {
            name: arr[3] ? arr[3] : "",
            finished: false,
            stepIndex: 0,
            // listTourGuide: this.props.listTourGuide? this.props.listTourGuide : [],
        };
        this.deleteEvent = this.deleteEvent.bind(this);
        this.savePlan = this.savePlan.bind(this);
    }

    async componentWillMount() {
        if (this.state.name) {
            let response = await axios.get(this.url_backend + this.state.name);

            let dayEvents = [];
            if (response.data.events) {
                let dayEvent = {
                    index: undefined,
                    day: undefined,
                };
                response.data.events.map(function (event, index) {
                    if (dayEvent.day !== event['start-time'].substr(0, 10)) {
                        dayEvent = {
                            index: index,
                            day: event['start-time'].substr(0, 10),
                        };
                        dayEvents.push(dayEvent)
                    }
                });
            }
            this.setState({
                id: response.data.id,
                'start-day': response.data['start-day'],
                'end-day': response.data['end-day'],
                events: response.data.events ? response.data.events : [],
                dayEvents: dayEvents,
                transaction: response.data.transaction,
            });
        }
    };

    addEvent = (event) => {
        let dayEvents = [];
        let dayEvent = {
            index: undefined,
            day: undefined,
        };
        let events = this.state.events;

        if (!event.id) {
            events.push(event);
        } else {
            //find the index by event.id
            let index = events.map(function (e) {
                return e.id;
            }).indexOf(event.id);
            events[index] = event;
        }

        events.map(function (element, index) {
            if (dayEvent.day !== element['start-time'].substr(0, 10)) {
                dayEvent = {
                    index: index,
                    day: element['start-time'].substr(0, 10),
                };
                dayEvents.push(dayEvent)
            }
        });

        this.setState({
            events: events,
            dayEvents: dayEvents
        });
    };


    async deleteEvent(event) {
        //find the index by event
        let index = this.state.events.indexOf(event);
        await this.setState({
            events: [...this.state.events.slice(0, index), ...this.state.events.slice(index + 1)]
        });

        if (this.state.events) {
            let dayEvents = [];
            let dayEvent = {
                index: undefined,
                day: undefined,
            };
            this.state.events.map(function (element, index) {
                if (dayEvent.day !== element['start-time'].substr(0, 10)) {
                    dayEvent = {
                        index: index,
                        day: element['start-time'].substr(0, 10),
                    };
                    dayEvents.push(dayEvent)
                }
            });

            await this.setState({
                dayEvents: dayEvents
            });
        }
    };

    savePlan() {
        if (this.state.name === "") {
            this.setState({
                nameErrorMessage: "This field is required"
            });
            return;
        }
        if (this.state.id) {
            this.props.update(this.state.id, this.state);
        } else {
            this.props.save(this.state);
        }

    };

    onNameChange = (event) => {
        this.setState({
            name: event.target.value,
            nameErrorMessage: undefined
        });
    };

    toLocalDate = (date) => {
        let month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth();
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    };

    onStartDayChange = (event, value) => {
        this.setState({
            'start-day': this.toLocalDate(value),
        });
    };

    onEndDayChange = (event, value) => {
        this.setState({
            'end-day': this.toLocalDate(value),
        });
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    renderStepActions(step) {
        const {stepIndex} = this.state;

        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                    label='Next'
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onClick={this.handleNext}
                    style={{marginRight: 12}}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onClick={this.handlePrev}
                    />
                )}
            </div>
        );
    }

    onTourGuideChange = (searchText, dataSource, params) => {
        let data = this.props.listTourGuide ? this.props.listTourGuide.find(function (element) {
            return element.name === searchText;
        }) : undefined;
        this.setState({
            transaction: {
                ...this.state.transaction,
                "tour-guide": data,
            }
        });
    };

    render() {
        console.log(this.props);
        const {finished, stepIndex} = this.state;
        let startDay = this.state['start-day'] ? new Date(this.state['start-day']) : undefined;
        let endDay = this.state['end-day'] ? new Date(this.state['end-day']) : undefined;
        const listTourGuide = [];
        if (this.props.listTourGuide)
            this.props.listTourGuide.map(function (event, index) {
                listTourGuide.push({
                    text: event.name,
                    value: (
                        <MenuItem
                            primaryText={event.name}
                            secondaryText="&#9786;"
                        />
                    ),
                },)
            });
        let tourGuide = this.state.transaction ? this.state.transaction['tour-guide'] : undefined;

        return (
            <div>
                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>Planning your trip</StepLabel>
                        <StepContent>
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <PageBase title="My Plan">
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
                                                                  addEvent={this.addEvent}
                                                                  deleteEvent={this.deleteEvent}/>
                                                </div>
                                                <div className="col-md-8 col-sm-12 col-xs-12" style={styles.map}>
                                                    <PlanningMap data={this.state.events}/>
                                                </div>
                                            </div>
                                        </div>
                                    </PageBase>
                                </div>
                            </div>
                            {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Choose your tour guide</StepLabel>
                        <StepContent>
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <PageBase title='Private Tour Guide'>
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <div className="col-md-4 col-sm-12 col-xs-12">
                                                <AutoComplete
                                                    floatingLabelText="Tour guide's name"
                                                    searchText={tourGuide ? tourGuide.name : undefined}
                                                    hintText="Choose your tour guide"
                                                    onUpdateInput={this.onTourGuideChange}
                                                    filter={AutoComplete.noFilter}
                                                    openOnFocus={true}
                                                    fullWidth={true}
                                                    dataSource={listTourGuide}
                                                />
                                            </div>
                                            <div className="col-md-4 col-sm-12 col-xs-12">
                                                <TextField
                                                    floatingLabelText="Price per day"
                                                    fullWidth={true}
                                                    type="text"
                                                    value={tourGuide ? '$' + tourGuide.price : undefined}
                                                    disabled={true}
                                                />
                                            </div>
                                            <div className="col-md-4 col-sm-12 col-xs-12">
                                                <TextField
                                                    floatingLabelText="Experience"
                                                    fullWidth={true}
                                                    type="text"
                                                    value={tourGuide ? tourGuide.experience : undefined}
                                                    disabled={true}
                                                />
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <TextField
                                                    floatingLabelText="Description"
                                                    fullWidth={true}
                                                    type="text"
                                                    value={this.state.transaction ?
                                                        this.state.transaction['tour-guide'].description
                                                        : undefined}
                                                    disabled={true}
                                                    multiLine={true}
                                                    rows={1}
                                                />
                                            </div>
                                        </div>
                                    </PageBase>
                                </div>
                            </div>
                            {this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Payment</StepLabel>
                        <StepContent>
                            <p>
                                Try out different ad text to see what brings in the most customers,
                                and learn how to enhance your ads using features like ad extensions.
                                If you run into any problems with your ads, find out how to tell if
                                they're running and how to resolve approval issues.
                            </p>
                            <div style={styles.buttons}>
                                <RaisedButton
                                    label='Submit'
                                    disableTouchRipple={true}
                                    disableFocusRipple={true}
                                    primary={true}
                                    onClick={this.savePlan}
                                    icon={<ContentSave/>}
                                    style={styles.saveButton}
                                />
                                <Link to="/home/plans">
                                    <RaisedButton
                                        label="Cancel"
                                        icon={<AvNotInterested/>}
                                        style={styles.buttonCancel}
                                        backgroundColor={green600}
                                        labelColor={white}
                                    />
                                </Link>
                                <FlatButton
                                    label="Back"
                                    style={styles.buttonCancel}
                                    disableTouchRipple={true}
                                    disableFocusRipple={true}
                                    onClick={this.handlePrev}
                                />
                            </div>
                        </StepContent>
                    </Step>
                </Stepper>
                {finished && (
                    <p style={{margin: '20px 0', textAlign: 'center'}}>
                        <a
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();
                                this.setState({stepIndex: 0, finished: false});
                            }}
                        >
                            Click here
                        </a> to reset the example.
                    </p>
                )}
            </div>
        )
    }
}

export default MyPlanForm;