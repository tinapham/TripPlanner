import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import {Link} from 'react-router-dom';

class ChoosePlanTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            beginDay: new Date(),
            errorBeginDay: undefined,
            'start-day': this.toLocalDate(new Date()),
            'end-day': this.toLocalDate(new Date(new Date().valueOf() + 1000 * 3600 * 24))
        };
        this.submit = this.submit.bind(this);
    }


    onBeginningDayChange = (event, value) => {
        this.setState({
            beginDay: value,
            errorBeginDay: undefined,
        });
    };

    toLocalDate = (date) => {
        let month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth();
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    };

    async submit() {
        if (!this.state.beginDay) {
            this.setState({
                errorBeginDay: 'This field cannot empty'
            });
            return;
        }

        await this.setState({
            'start-time': this.toLocalDate(this.state.beginDay) + ' ' + this.toLocalTime(this.state.beginTime),
            'end-time': this.toLocalDate(this.state.endDay) + ' ' + this.toLocalTime(this.state.endTime),
        });

        this.props.addEvent(this.state);
        this.props.handleClose();

    }

    render() {

        console.log(this.state['end-day']);

        let startDay = this.state.beginDay ? new Date(this.state.beginDay) : undefined;

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.handleClose}
            />,
            <FlatButton
                label="OK"
                primary={true}
                onClick={this.submit}
            />
        ];

        return (
            <Dialog
                title="Pick a day to start the trip"
                actions={actions}
                modal={true}
                open={this.props.open}
            >
                <form>
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
                </form>
            </Dialog>
        );
    }
}


export default ChoosePlanTemplate;