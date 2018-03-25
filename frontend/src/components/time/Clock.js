import React from 'react';
import Analog from './Analog';
import moment from 'moment-timezone';
import { getHorizontalLayoutStyle, getVerticalLayoutStyle, getBackGroundColor } from './ClockStyle';
import './clock.css';
const timeFormat = 'HH:mm:ss';
const dateFormat = 'ddd D MMM';
class Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({
      time: moment().utcOffset(this.props.params['utc-diff'] * 60).format(timeFormat),
      date: moment().utcOffset(this.props.params['utc-diff'] * 60).format(dateFormat),
    });
  }

  incrementCounter() {
    this.setState({
      time: moment().utcOffset(this.props.params['utc-diff'] * 60).format(timeFormat),
      date: moment().utcOffset(this.props.params['utc-diff'] * 60).format(dateFormat)
    });
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.incrementCounter(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const styles = this.props.widthSize > this.props.heightSize ? getHorizontalLayoutStyle(this.props.widthSize, this.props.heightSize) : getVerticalLayoutStyle(this.props.widthSize, this.props.heightSize);
    const ClassClockCss = "clock " + getBackGroundColor(moment().utcOffset(this.props.params['utc-diff'] * 60).format("HH"));

    return (
      <div className={ClassClockCss} style={styles.clock}>
        <Analog analogStyle={styles.analog} utcDiff={this.props.params['utc-diff']} />
        <div style={styles.text}>
          <h2 style={styles.time}>{this.state.time}</h2>
          <h2 style={styles.date}>{this.state.date}</h2>
          <h2 style={styles.city}>{this.props.params.city}</h2>
        </div>
      </div>
    );
  }
}

export default Clock;