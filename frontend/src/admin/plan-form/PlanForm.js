import React, {Component} from 'react';
import '../Admin.css';
import update from 'immutability-helper'
import LabelContainer from '../dndEventLabel/LabelContainer';
import {Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentSave from 'material-ui/svg-icons/content/save';
import AvNotInterested from 'material-ui/svg-icons/av/not-interested';
import EventForm from './EventForm';
import DatePicker from 'material-ui/DatePicker';
import styles from './FormsStyle';

class PlanForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.location.state ? this.props.location.state.data.id : undefined,
      name: this.props.location.state ? this.props.location.state.data.name : "",
      'start-day': this.props.location.state ? this.props.location.state.data['start-day'] : "",
      'end-day': this.props.location.state ? this.props.location.state.data['end-day'] : "",
      events: this.props.location.state ? this.props.location.state.data.events : [],
      activatedEventForm: false,
      idEvents: this.getIdEvents(this.props.location.state ? this.props.location.state.data.events : []),
      errorMessage: undefined
    }
    this.showEventForm = this.showEventForm.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.savePlan = this.savePlan.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onStartDayChange = this.onStartDayChange.bind(this);
    this.onEndDayChange = this.onEndDayChange.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.onEventChange = this.onEventChange.bind(this);
  }

  getIdEvents(events) {
    let idEvents = [];
    if (events.length > 0) {
      events.map((event, i) => {
        idEvents.push(event.id)
      })
    }
    return idEvents;
  }

  updateEvent(dragIndex, hoverIndex) {
    const {events} = this.state;
    const dragScreen = events[dragIndex]
    this.setState(
      update(this.state, {
        events: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragScreen]],
        },
      }),
    )
  }

  showEventForm(value, event) {
    this.setState({
      activatedEventForm: value,
      event: event
    });
  }

  addEvent() {
    let defaultEvent = {
      id: -Number(new Date()),
      "start-time": new Date().toISOString(),
      "end-time": new Date().toISOString(),
      attraction: this.props.attractions[0]
    };
    this.setState({
      events: [...this.state.events, defaultEvent],
      activatedEventForm: true,
      event: defaultEvent
    });
  }

  savePlan() {
    console.log(this.state);
    if (this.state.name === "") {
      this.setState({
        errorMessage: "This field is required"
      })
    } else {
      let {events} = this.state;
      events.map((event, i) => {
        event.id = this.state.idEvents[i]
      });
      if (this.state.id) {
        this.props.update(this.state.id, this.state)
      } else {
        this.props.save(this.state);
      }
    }

  }

  onNameChange(event) {
    this.setState({
      name: event.target.value,
      errorMessage: undefined
    });
  }

  onStartDayChange(event, value) {
    this.setState({
      'start-day': value.toISOString().substr(0,10),
      errorMessage: undefined
    });
  }

  onEndDayChange(event, value) {
    this.setState({
      'end-day': value.toISOString().substr(0,10),
      errorMessage: undefined
    });
  }

  onEventChange(key, value) {
    let data = this.state.event;
    data[key] = value;
    this.setState(
      update(this.state, {
        event: {
          $set: data
        },
      }),
    );
  }

  deleteEvent(position) {
    this.setState({
      events: [...this.state.events.slice(0, position),
        ...this.state.events.slice(position + 1)],
      activatedEventForm: false,
    });
  }

  render() {
    let startDay = this.state['start-day']? new Date(this.state['start-day']): undefined;
    let endDay = this.state['end-day']? new Date(this.state['end-day']): undefined;
    return (
      <div className="row">
        <div className="col-md-6 col-sm-12 col-xs-12">
          <PageBase title="Trip Planning">
            <div>
              <TextField
                id="name"
                name="name"
                floatingLabelText="Name"
                fullWidth={true}
                type="text"
                hintText="eg: Summer Trip, Christmas Holiday, ..."
                value={this.state.name}
                onChange={this.onNameChange}
                ref="name"
                errorText={this.state.errorMessage}
              />

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

              <div style={styles.toggleDiv}>
                <label>Events:</label>
                <div className="text-left">
                  <div className="tags">
                    <LabelContainer events={this.state.events}
                                    deleteEvent={this.deleteEvent}
                                    onClick={this.showEventForm}
                                    updateEvent={this.updateEvent}/>
                  </div>
                </div>
              </div>

              <RaisedButton
                label="Add New Event"
                primary={true}
                style={styles.buttonAdd}
                onClick={this.addEvent}
                icon={<ContentAdd/>}
              />
              <Divider/>

              <div style={styles.buttons}>
                <Link to="/admin/plans">
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
        <div className="col-md-6 col-sm-12 col-xs-12">
          {
            this.state.activatedEventForm
              ? <EventForm event={this.state.event}
                           attractions = {this.props.attractions}
                           onEventChange = {this.onEventChange}
                           showEventForm={this.showEventForm}
              />
              : undefined
          }
        </div>
      </div>
    )
  }
}

export default PlanForm;