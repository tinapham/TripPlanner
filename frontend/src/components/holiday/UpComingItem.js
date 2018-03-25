import React, { Component } from 'react';
import { handleUpComingHoliday, getStyles } from './action';

class UpComingItem extends Component {

	render() {
		let date = new Date(this.props.upcoming.date);
		let row = handleUpComingHoliday(this.props.upcoming.holidayUpComing);
		const styles = getStyles(window.innerWidth, window.innerHeight)
		return (
			<div className="col-xs-12 wrapper-eachItem">
				<div className="row eachItem " style={styles.eachItem}>
					<div className="col-md-3 text-left text-color" style={styles.textContent}>
						<span>{date.toDateString()}</span>
					</div>
					<div className="col-md-9">
						<span className="up-event-content" style={styles.upEventContent}>{row}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default UpComingItem;