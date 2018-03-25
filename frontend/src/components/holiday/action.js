import offices from '../../static/resources/file/config/offices.json';
import Holidays from 'date-holidays';

let holidayData = [];
const size = offices.length;

function upComingItemConvertRowToString(row) {
	let rowContent = "";
	for (let i = 0; i < row.length; i++) {
		rowContent += (row[i].name + "(");
		rowContent += row[i].offices.join();
		rowContent += " )";
	}
	return rowContent;
}

function inRange(date, start, end) {
	let currentYear = date.getFullYear();
	if (currentYear > start.getFullYear()) {
		start.setFullYear(currentYear);
		end.setFullYear(currentYear);
	}
	return (start <= date && date <= end);
}

function isHoliday(position, date, type) {
	let holiday = holidayData[position];
	for (let i = 0; i < holiday.length; i++) {
		if (holiday[i].type === type && inRange(date, holiday[i].start, holiday[i].end)) {
			return holiday[i];
		}
	}
	return false;
}

export function initHolidayData(currentDate) {
	holidayData = [];
	let year = currentDate.getFullYear();
	for (let i = 0; i < size; i++) {
		let holiday = new Holidays(offices[i].countryCode, offices[i].cityCode);
		holiday.setLanguages("en");
		holidayData.push(holiday.getHolidays(year));
	}
}

export function getHolidayAtCurrentDate(currentDate) {
	let results = [];
	for (let i = 0; i < size; i++) {
		let obj = {
			location: offices[i],
			holidayToday: isHoliday(i, currentDate, "public")
		};
		results.push(obj);
	}
	return results;
}

export function getUpComingHoliday(currentDate) {
	let results = [];
	let nextDate = new Date(currentDate);
	for (let i = 0; i < 13; i++) {
		nextDate.setTime(nextDate.getTime() + (24 * 60 * 60 * 1000));
		let obj = {};
		let holidayUpComing = [];
		for (let j = 0; j < size; j++) {
			holidayUpComing.push(isHoliday(j, nextDate, "public"));
		}
		obj.date = new Date(nextDate);
		obj.holidayUpComing = holidayUpComing;
		results.push(obj);
	}
	return results;
}

export function handleUpComingHoliday(holidayUpComing) {
	let row = [];
	let listNameHoliday = [];
	for (let i = 0; i < holidayUpComing.length; i++) {
		if (holidayUpComing[i]) {
			let index = listNameHoliday.indexOf(holidayUpComing[i].name);
			if (index === -1) {
				listNameHoliday.push(holidayUpComing[i].name);
				let holiday = {
					name: holidayUpComing[i].name,
					offices: []
				}
				holiday.offices.push(" " + offices[i].cityName);
				row.push(holiday);
			} else {
				row[index].offices.push(" " + offices[i].cityName)
			}
		}
	}
	return upComingItemConvertRowToString(row);
}
export function getStyles(widthSize, heightSize) {
	let size = widthSize < heightSize ? widthSize : heightSize
	let style = {
		eachItem: {
			fontSize: `${size / 25}px`,
			minHeight: `${size / 25}px`,
			maxHeight: `${size / 20}px`,
		},
		logoOffices: {
			height: `${size / 25}px`,
			width: `${size / 25}px`,
			marginRight: `${size / 60}px`
		},
		logomgm: {
			width: `${size / 10}px`,
			marginLeft: `${size / 20}px`,
			marginTop: `${size / 60}px`,
		},
		holidayTitle: {
			fontSize: `${size / 19}px`,
		},
		panelHeadingTitle: {
			fontSize: `${size / 47}px`,
			marginTop: `0px`,
		},
		upEventContent: {
			fontSize: `${size / 58}px`,
			float: `left`
		},
		textContent: {
			fontSize: `${size / 55}px`,
			paddingLeft: `${size / 60}px`,
			float: `left`
		}
	}
	return style;
}