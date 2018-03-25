import React, { Component } from 'react';
import { getHolidayAtCurrentDate, getUpComingHoliday, initHolidayData, getStyles } from './action';
import TodayItem from './TodayItem';
import UpComingItem from './UpComingItem';
import './holiday.css';


class Holiday extends Component {

    holiday = {
        today: [],
        upcoming: []
    };

    constructor() {
        super();
        //let currentDate = new Date("Dec 26 2017 06:00:00 GMT+0700"); //just use to demo
        let currentDate = new Date();
        this.state = {
            currentDate: currentDate
        };
    }

    componentWillMount() {
        initHolidayData(this.state.currentDate);
        this.holiday = {
            today: getHolidayAtCurrentDate(this.state.currentDate),
            upcoming: getUpComingHoliday(this.state.currentDate)
        }
    }

    render() {
        const styles = getStyles(window.innerWidth, window.innerHeight)
        return (
            <div className="holiday-Bg">
                <div className="col-md-12 holiday-content">
                    <p className="holiday-header">
                        <span className="wapper-logo-mgm"><img className="logo-mgm" style={styles.logomgm} src='./images/mgm-logo.svg' alt="" /> </span>
                        <span className="holiday-title" style={styles.holidayTitle}>International Holidays</span>
                    </p>
                    <div className="row wrapper">
                        <div className="col-xs-6 panel-info">
                            <div className="panel panel-info">
                                <div className="panel-heading panel-heading-color"><h3 style={styles.panelHeadingTitle}>Today Holiday - {this.state.currentDate.toDateString()}</h3></div>
                                <div className="panel-body">
                                    <div className="row panel-body-row">
                                        {this.holiday.today.map((element, index) => <TodayItem key={index} today={element} />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 panel-info">
                            <div className="panel panel-info">
                                <div className="panel-heading panel-heading-color"><h3 style={styles.panelHeadingTitle}>Up Coming - 2 Weeks</h3></div>
                                <div className="panel-body">
                                    <div className="row panel-body-row">
                                        {this.holiday.upcoming.map((element, index) => <UpComingItem key={index} upcoming={element} />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Holiday;
