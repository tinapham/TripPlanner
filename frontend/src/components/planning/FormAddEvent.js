import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {sha256} from 'js-sha256';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import axios from "axios/index";

class FormAddEvent extends React.Component {

    url_backend = process.env.REACT_APP_BACKEND_URL + "api/attraction/";

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.data ? this.props.data.id : undefined,
            beginDay: this.props.data ? new Date(this.props.data['start-time']) : undefined,
            beginTime: this.props.data ? new Date(this.props.data['start-time']) : undefined,
            endDay: this.props.data ? new Date(this.props.data['end-time']) : undefined,
            endTime: this.props.data ? new Date(this.props.data['end-time']) : undefined,
            attraction: this.props.data ? this.props.data.attraction : undefined,
            errorBeginDay: undefined,
            errorBeginTime: undefined,
            errorEndDay: undefined,
            errorEndTime: undefined,
        };
        this.submit = this.submit.bind(this);
    }

    async componentDidMount() {
        let response = await axios.get(this.url_backend);
        this.setState({
            dataAttractions: response.data,
        });
    };

    onBeginningDayChange = (event, value) => {
        this.setState({
            beginDay: value,
            errorBeginDay: undefined,
        });
    };

    onBeginningTimeChange = (event, value) => {
        this.setState({
            errorBeginTime: undefined,
            beginTime: value
        });
    };

    onEndingDayChange = (event, value) => {
        this.setState({
            errorEndDay: undefined,
            endDay: value
        });
    };

    onEndingTimeChange = (event, value) => {
        this.setState({
            errorEndTime: undefined,
            endTime: value
        });
    };

    onAttractionChange = (searchText, dataSource, params) => {
        let data = this.state.dataAttractions.find(function (element) {
            return element.name === searchText;
        });
        this.setState({
            attraction: data
        });
    };

    reset = () => {
        this.setState({
            beginDay: undefined,
            beginTime: undefined,
            endDay: undefined,
            endTime: undefined
        });
    };

    toLocalDate = (date) => {
        let month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth();
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    };

    toLocalTime = (date) => {
        let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return hour + ':' + minute;
    };

    async submit() {
        if (!this.state.beginDay) {
            this.setState({
                errorBeginDay: 'This field cannot empty'
            });
            return;
        }

        if (!this.state.beginTime) {
            this.setState({
                errorBeginTime: 'This field cannot empty'
            });
            return;
        }

        if (!this.state.endDay) {
            this.setState({
                errorEndDay: 'This field cannot empty'
            });
            return;
        }

        if (!this.state.endTime) {
            this.setState({
                errorEndTime: 'This field cannot empty'
            });
            return;
        }

        await this.setState({
            'start-time': this.toLocalDate(this.state.beginDay) + ' ' + this.toLocalTime(this.state.beginTime),
            'end-time': this.toLocalDate(this.state.endDay) + ' '+ this.toLocalTime(this.state.endTime),
        });

        this.props.addEvent(this.state);
        this.props.handleClose();

    }

    render() {

        let startDay = this.state.beginDay ? new Date(this.state.beginDay) : undefined;
        let endDay = this.state.endDay ? new Date(this.state.endDay) : undefined;
        let startTime = this.state.beginTime ? new Date(this.state.beginTime) : undefined;
        let endTime = this.state.endTime ? new Date(this.state.endTime) : undefined;
        let attractionName = this.state.attraction ? this.state.attraction.name : undefined;

        const list = [];
        if (this.state.dataAttractions)
            this.state.dataAttractions.map(function (event, index) {
                list.push({
                    text: event.name,
                    value: (
                        <MenuItem
                            primaryText={event.name}
                            secondaryText="&#9786;"
                        />
                    ),
                },)
            });

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.handleClose}
            />,
            <FlatButton
                label="Reset"
                primary={true}
                onClick={this.reset}
            />,
            <FlatButton
                label="OK"
                primary={true}
                onClick={this.submit}
            />,
        ];

        return (
            <Dialog
                title="Add New Event"
                actions={actions}
                modal={true}
                open={this.props.open}
            >
                <form>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <DatePicker
                            id="begin-day"
                            name="begin-day"
                            floatingLabelText="Beginning day"
                            hintText="Enter the beginning day"
                            fullWidth={true}
                            value={startDay}
                            onChange={this.onBeginningDayChange}
                            errorText={this.state.errorBeginDay}
                        />
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <TimePicker
                            hintText="Enter the beginning time"
                            value={startTime}
                            onChange={this.onBeginningTimeChange}
                            floatingLabelText="Start time"
                            fullWidth={true}
                            errorText={this.state.errorBeginTime}
                        />
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <DatePicker
                            id="end-day"
                            name="end-day"
                            floatingLabelText="Ending day"
                            hintText="Enter the ending day"
                            fullWidth={true}
                            value={endDay}
                            onChange={this.onEndingDayChange}
                            errorText={this.state.errorEndDay}
                        />
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <TimePicker
                            hintText="Enter the ending time"
                            value={endTime}
                            onChange={this.onEndingTimeChange}
                            floatingLabelText="Ending time"
                            fullWidth={true}
                            errorText={this.state.errorEndTime}
                        />
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <AutoComplete
                            floatingLabelText="Destination"
                            searchText={attractionName}
                            hintText="Choose the next destination"
                            onUpdateInput={this.onAttractionChange}
                            filter={AutoComplete.noFilter}
                            openOnFocus={true}
                            fullWidth={true}
                            dataSource={list}
                        />
                    </div>
                </form>
            </Dialog>
        );
    }
}

export default FormAddEvent;