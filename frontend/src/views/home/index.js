import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PageBase from '../../components/page-base/PageBase';
import ContentSave from 'material-ui/svg-icons/content/save';
import DatePicker from 'material-ui/DatePicker';
import styles from './styles';

class PlanForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            'start-day': "",
            'end-day': ""
        };
        this.savePlan = this.savePlan.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onStartDayChange = this.onStartDayChange.bind(this);
        this.onEndDayChange = this.onEndDayChange.bind(this);
    }

    savePlan() {
        if (this.state.name === "") {
            this.setState({
                nameErrorMessage: "This field is required"
            });
            return;
        }
        if (this.state['start-day']=== "") {
            this.setState({
                startErrorMessage: "This field is required"
            });
            return;
        }
        if(this.state['end-day']=== ""){
            this.setState({
                endErrorMessage: "This field is required"
            });
            return;
        }
        this.props.save(this.state);

    }

    onNameChange(event) {
        this.setState({
            name: event.target.value,
            nameErrorMessage: undefined
        });
    }

    onStartDayChange(event, value) {
        this.setState({
            'start-day': value.toISOString().substr(0, 10),
            startErrorMessage: undefined
        });
    }

    onEndDayChange(event, value) {
        this.setState({
            'end-day': value.toISOString().substr(0, 10),
            endErrorMessage: undefined
        });
    }

    render() {
        let startDay = this.state['start-day'] ? new Date(this.state['start-day']) : undefined;
        let endDay = this.state['end-day'] ? new Date(this.state['end-day']) : undefined;
        return (
            <div>
                <div className="banner" style={styles.banner}/>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <PageBase title="Start planning your trip">
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
                                    errorText={this.state.startErrorMessage}
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
                                    errorText={this.state.endErrorMessage}
                                    openToYearSelection={true}
                                />
                            </div>


                            <div style={styles.buttons}>
                                <RaisedButton label="Create"
                                              onClick={this.savePlan}
                                              style={styles.saveButton}
                                              type="submit"
                                              icon={<ContentSave/>}
                                              secondary={true}/>
                            </div>
                        </PageBase>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlanForm;