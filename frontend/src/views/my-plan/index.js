import React from 'react';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MyPlanForm from '../my-plan';
import axios from "axios/index";

/**
 * Vertical steppers are designed for narrow screen sizes. They are ideal for mobile.
 *
 * To use the vertical stepper with the contained content as seen in spec examples,
 * you must use the `<StepContent>` component inside the `<Step>`.
 *
 * <small>(The vertical stepper can also be used without `<StepContent>` to display a basic stepper.)</small>
 */
class MyPlan extends React.Component {

    url_backend = process.env.REACT_APP_BACKEND_URL + "api/plan/";

    constructor(props) {
        super(props);
        let arr = this.props.location.pathname.split('/');
        this.state = {
            finished: false,
            stepIndex: 0,
            name: arr ? arr[3] : "",
        };
    }

    async componentDidMount() {
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
                    label={stepIndex === 2 ? 'Finish' : 'Next'}
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

    render() {
        const {finished, stepIndex} = this.state;
        return (
            <div>
                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>Planning your trip</StepLabel>
                        <StepContent>
                            <p>
                                For each ad campaign that you create, you can control how much
                                you're willing to spend on clicks and conversions, which networks
                                and geographical locations you want your ads to show on, and more.
                                {
                                    // this.state.name ? <MyPlanForm/> : undefined
                                }
                            </p>
                            {/*{this.renderStepActions(0)}*/}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Choose your tour guide</StepLabel>
                        <StepContent>
                            <p>An ad group contains one or more ads which target a shared set of keywords.</p>
                            {/*{this.renderStepActions(1)}*/}
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
                            {/*{this.renderStepActions(2)}*/}
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
        );
    }
}

export default MyPlan;

{/*<MyPlanForm planName={this.state.planName}/>*/}
