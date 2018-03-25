import React from 'react';
import axios from 'axios';
import CalendarGUI from './CalendarGUI';
import moment from 'moment-timezone';
import { transformData } from './action';

import { getRemoteDataURL, isDataExist, isDataExpired, storeLocalData } from '../../fetchAPIDataUtil';

const rootUrl = 'https://www.googleapis.com/calendar/v3/calendars/';
const searchEvent = '/events?key=';
const key = 'AIzaSyDyWLiA-Jd0WcDsbedpw-7I8dp-rdinktA';
const componentKey = 'calendar';
const ex_sec = 10;

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
        };
    }

    getUrl(id, timeMin) {
        return rootUrl + id + searchEvent + key + timeMin;
    }

    getCalendar(props) {
        if (isDataExist(componentKey) && !isDataExpired(componentKey)) {
            let events = JSON.parse(localStorage.getItem(componentKey)).data;
            // Transfer all Date properties stored as string in LocalStorage
            events = events.map((event) => {
                return {
                    ...event,
                    ...{
                        end: new Date(event.end),
                        start: new Date(event.start)
                    }
                };
            });
            this.setState({ events: events });

        } else {
            let events = [];
            let arr = [];
            let events_refined = [];
            let timeMin = '&timeMin=' + encodeURIComponent(moment().startOf('week').add(1, 'day').format());

            for (let i = 1; i <= props.params['number-of-calendars']; i++) {
                let item = {
                    'calendar-id': props.params['calendar-id-' + i],
                    'color': props.params['color-' + i]
                };
                arr.push(item);
            }
            for (let i = 0; i < props.params['number-of-calendars']; i++) {
                events.push(axios.get(getRemoteDataURL(this.getUrl(arr[i]['calendar-id'], timeMin), ex_sec)));
            }
            axios.all(events)
                .then(axios.spread((...events) => {
                    for (let i = 0; i < props.params['number-of-calendars']; i++) {
                        events_refined = [...events_refined, ...transformData(events[i], arr[i]['color'], this.props.params['time-max'], this.props.params['time-min'])];
                    }
                }))
                .then(() => {
                    this.setState({ events: events_refined });
                    storeLocalData(componentKey, events_refined, ex_sec);
                });
        }
    }

    componentDidMount() {
        this.getCalendar(this.props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        for (let i = 0; i < this.props.params['number-of-calendars']; i++) {
            if (JSON.stringify(this.state.events[i]) !== JSON.stringify(nextState.events[i])) return true;
        }
        return false;
    }

    render() {
        return (
            <CalendarGUI events={this.state.events}
                name={this.props.params.name}
                maxTime={this.props.params['time-max']}
                minTime={this.props.params['time-min']}
            >
            </CalendarGUI>
        )
    }
}

export default Calendar;
