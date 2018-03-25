import React from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import { minNumber, maxNumber, eventStyleGetter, findLongestWord } from './action';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';


class CalendarGUI extends React.Component {

    constructor(props) {
        super(props);
        BigCalendar.momentLocalizer(moment);
    }

    setEvent({ event }) {
        let screenValue = minNumber(window.innerHeight, window.innerWidth);
        let fontSize = event.end.getHours() - event.start.getHours();

        //if the duration time of event < 3 hours, the description will not be shown
        if (fontSize < 3) {
            event.desc = undefined;
        }

        //need value of time range for calendar screens here (e.g. 11 hours -from 8-19)
        fontSize = maxNumber(screenValue * 0.04, (screenValue * 0.16 * fontSize) / (event['time-range']));
        fontSize = minNumber(window.innerWidth * 0.23 / findLongestWord(event.title), fontSize);

        return (
            // the font size of the description will be smaller than title font size of the title
            <span>
                <strong style={{ fontSize: fontSize + 'px', color: 'white' }} >
                    {event.title}
                </strong><br />
                <span style={{ fontSize: fontSize / 2 + 'px' }}>
                    {event.desc && (':  ' + event.desc)}
                </span>
            </span>
        )
    }

    render() {
        const allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k]);
        return (
            <div className='calendar-content'>
                <span className="calendar-name">{this.props.name}</span>
                <BigCalendar
                    {...this.props}
                    events={this.props.events}
                    views={allViews}
                    defaultDate={new Date()}
                    //monday to friday
                    defaultView='work_week'
                    toolbar={false}
                    //it will receive property for each event in the array automatically
                    components={{
                        event: this.setEvent,
                    }}
                    eventPropGetter={(eventStyleGetter)}
                    //set time range for calendar (from min(hour) to max(hour))
                    max={new Date(0, 0, 0, this.props.maxTime - 1, 59)}
                    min={new Date(0, 0, 0, this.props.minTime)}
                    endAccessor={({ end }) => new Date(end.getTime() - 1)}
                />
            </div>
        )
    }
}

export default CalendarGUI;