import React from 'react';
import Clock from '../time/Clock';
import Hello from '../hello/Hello';
import Website from '../website/Website';
import Holiday from '../holiday/Holiday';
import FacebookPage from '../facebook/FacebookPage';
import Danang from '../danang/Danang';
import Hamburg from '../hamburg/Hamburg';
import Weather from '../weather/Weather';
import Calendar from '../calendar/Calendar';

var row;
var column;
var state;
const components = {
    Calendar: Calendar,
    Hello: Hello,
    Clock: Clock,
    Website: Website,
    Holiday: Holiday,
    Facebook: FacebookPage,
    Danang: Danang,
    Hamburg: Hamburg,
    Weather: Weather
};

function getElements(apps) {
    let rowList = [];
    let count = 0;
    for (let i = 0; i < row; i++) {
        rowList.push([]);
    }
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            rowList[i].push(
                React.cloneElement(getElement(apps[count]), { key: count })
            )
            count++;
        }
    }
    return rowList;
}

function getElement(app) {
    let MyElement = components[app['type']];
    return <MyElement widthSize={state.width / column}
        heightSize={state.height / row}
        isChanged={state.isChanged}
        params={app['params']} />
}

function isGridLayout() {
    return (column !== 1 || row !== 1);
}

export function View(cols, rows, apps, currentState) {
    row = rows;
    column = cols;
    state = currentState;
    if (!isGridLayout()) { return getElement(apps[0]) }
    else {
        let combineClassName = 'rowClock row-' + row;
        return getElements(apps).map((element, index) => <div key={index} className={combineClassName}>{element}</div>)
    }
}