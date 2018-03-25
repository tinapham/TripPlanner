export function maxNumber(a, b) {
    return (a > b) ? a : b
}

export function minNumber(a, b) {
    return (a < b) ? a : b
}

export function eventStyleGetter(event) {
    //choosing the background color
    let style = {
        backgroundColor: event.color,
        color: 'black',
    };
    return { style: style };

}

export function findLongestWord(title) {
    let words = title.split(' ');
    let maxLength = 0;

    for (var i = 0; i < words.length; i++) {
        if (words[i].length > maxLength) {
            maxLength = words[i].length;
        }
    }
    return maxLength;
}

export function transformData(response, color, timeMax, timeMin) {
    let items = response.data.items;
    let ret = [];
    let desc = undefined;


    for (let j = 0; j < items.length; j++) {
        let item = items[j];
        // just adding the first line of description
        if (item.description !== undefined) {
            desc = item.description.split('\n')[0];
        }
        let objEvent = {
            'title': item.summary,
            'start': undefined,
            'end': undefined,
            'desc': desc,
            'color': color,
            'allDay': false,
            'time-range': timeMax - timeMin
        };
        objEvent.title = objEvent.title ? objEvent.title : '(no title)';
        let start = new Date(item.start.dateTime || item.start.date);
        let end = new Date(item.end.dateTime || item.end.date);
        objEvent.allDay = (item.start.dateTime === undefined) || (item.end.dateTime === undefined);

        // Event All Day
        if (objEvent.allDay) {
            // set time : minus 1 day
            end.setTime(end.getTime() - 86400000);
            objEvent.start = start;
            objEvent.end = end;
            ret.push(objEvent);

            continue;
        }
        // Event within a day
        else if (end.getDate() === start.getDate()) {
            if (end.getHours() <= timeMin || start.getHours() >= timeMax) continue;
            objEvent.start = start;
            objEvent.end = end;
            ret.push(objEvent);
        }
        // Event take more than 2 days 
        else {
            let datePlusOne = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1, start.getHours());

            // push if event date start in time range
            if (start.getHours() < timeMax) {
                objEvent.start = new Date(item.start.dateTime);
                objEvent.end = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 24);
                ret.push(objEvent);
            }

            // push if event date end in time range
            if (end.getHours() > timeMin) {
                let objEvent2 = {
                    'title': item.summary,
                    'start': new Date(end.getFullYear(), end.getMonth(), end.getDate(), 0),
                    'end': new Date(item.end.dateTime),
                    'desc': desc,
                    'color': color,
                    'time-range': timeMax - timeMin
                }
                objEvent2.title = objEvent2.title ? objEvent2.title : '(no title)';
                ret.push(objEvent2);
            }

            // push all event for the middle days if exist
            while (datePlusOne.getDate() !== end.getDate()) {
                let objEvent3 = {
                    'title': item.summary,
                    'start': new Date(datePlusOne.getFullYear(), datePlusOne.getMonth(), datePlusOne.getDate(), timeMin),
                    'end': new Date(datePlusOne.getFullYear(), datePlusOne.getMonth(), datePlusOne.getDate(), timeMax),
                    'desc': desc,
                    'color': color,
                    'time-range': timeMax - timeMin,
                    'allDay': true
                }
                objEvent3.title = objEvent3.title ? objEvent3.title : '(no title)';
                ret.push(objEvent3);
                datePlusOne.setDate(datePlusOne.getDate() + 1);
            }
        }
        desc = undefined;
    }
    return ret;
}
