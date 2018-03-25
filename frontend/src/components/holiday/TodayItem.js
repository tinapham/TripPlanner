import React, { Component } from 'react';
import { getStyles } from './action';

class TodayItem extends Component {

	render() {
		const styles = getStyles(window.innerWidth, window.innerHeight)
		return (
			<div className="col-xs-12 wrapper-eachItem">
				<div className="row eachItem" style={styles.eachItem}>
					<div className="col-md-4 text-left text-color" style={styles.textContent}>
						<img className="logoOffices" style={styles.logoOffices} src={this.props.today.location.imagePath} alt="logo" />
						{this.props.today.location.cityName}
					</div>
					<div className="col-md-8 up-event-content" style={styles.upEventContent}>
						{this.props.today.holidayToday.name}
					</div>
				</div>
			</div>
		);
	}
}

export default TodayItem;