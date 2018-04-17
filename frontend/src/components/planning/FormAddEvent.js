import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {sha256} from 'js-sha256';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

class FormAddEvent extends React.Component {

    url = process.env.REACT_APP_BACKEND_URL + "api/user/add";

    constructor(props) {
        super(props);
        this.state = {
            beginDay: undefined,
            endDay: undefined,
        };
    }

    onBeginningDayChange = (event, value) => {
        this.setState({
            beginDay: value
        });
    };

    onBeginningTimeChange = (event, value) => {
        this.setState({
            beginTime: value
        });
    };

    onEndingDayChange = (event, value) => {
        this.setState({
            endDay: value
        });
    };

    onEndingTimeChange = (event, value) => {
        this.setState({
            endTime: value
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

    async register() {
        await this.setState({});
        let response = (!this.state.checkEmailType && !this.state.checkPasswordType && !this.state.match)
            ? await axios({
                method: 'POST',
                url: `${this.url}`,
                data: {
                    "start-time": this.state["start-time"],
                    "end-time": sha256(this.state["end-time"]),
                }
            })
            : undefined;
        if (response) {
            if (response.data === "USER IS EXISTED") {
                this.setState({
                    checkEmailType: "User is existed",
                    "start-time": "",
                    "end-time": "",
                    passwordConfirm: ""
                });
            } else if (response.data === "ERROR") {
                this.setState({
                    checkEmailType: "Cannot register",
                    "start-time": "",
                    "end-time": "",
                    passwordConfirm: ""
                });
            } else {
                window.location.href = "/admin/users";
            }
        }
    }

    render() {

        let startDay = this.state.beginDay? new Date(this.state.beginDay): undefined;
        let endDay = this.state.endDay? new Date(this.state.endDay): undefined;
        let startTime = this.state.beginTime? new Date(this.state.beginTime): undefined;
        let endTime = this.state.endTime? new Date(this.state.endTime): undefined;
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
                onClick={this.register}
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
                        />
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <TimePicker
                            hintText="Enter the beginning time"
                            value={startTime}
                            onChange={this.onBeginningTimeChange}
                            floatingLabelText="Start time"
                            fullWidth={true}
                            errorText={this.state.checkEmailType}
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
                        />
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <TimePicker
                            hintText="Enter the ending time"
                            value={endTime}
                            onChange={this.onEndingTimeChange}
                            floatingLabelText="Ending time"
                            fullWidth={true}
                            errorText={this.state.checkEmailType}
                        />
                    </div>
                    {/*<TextField*/}
                        {/*hintText="Choose destination"*/}
                        {/*errorText={this.state.match}*/}
                        {/*value={this.state.passwordConfirm}*/}
                        {/*onChange={this.onPasswordConfirmChange}*/}
                        {/*floatingLabelText="Destination"*/}
                        {/*fullWidth={true}*/}
                        {/*type="password"*/}
                    {/*/>*/}
                </form>
            </Dialog>
        );
    }
}

export default FormAddEvent;