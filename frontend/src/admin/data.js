import React from 'react';
import Assessment from 'material-ui/svg-icons/action/assessment';
import Group from 'material-ui/svg-icons/social/group';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import AccountBalance from 'material-ui/svg-icons/action/account-balance';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import MenuItem from 'material-ui/MenuItem';

const data = {
    menus: [
        {text: 'Attractions', icon: <Assessment/>, link: '/admin/attractions'},
        {text: 'Plans', icon: <ActionFlightTakeoff/>, link: '/admin/plans'},
        {text: 'Users', icon: <Group/>, link: '/admin/users'},
        {text: 'About us', icon: <AccountBalance/>, link: '/admin/about_us'},
        {text: 'Sign out', icon: <Exit/>, link: '/login'}
    ],
    adminMenus: [
        {text: 'Attractions', icon: <Assessment/>, link: '/admin/attractions'},
        {text: 'Plans', icon: <ActionFlightTakeoff/>, link: '/admin/plans'},
        {text: 'Users', icon: <Group/>, link: '/admin/users'},
        {text: 'About us', icon: <AccountBalance/>, link: '/admin/about_us'},
        {text: 'Sign out', icon: <Exit/>, link: '/login'}
    ],
    componentName: [
        <MenuItem value={"Weather"} key={1} primaryText="Weather"/>,
        <MenuItem value={"Clock"} key={2} primaryText="Clock"/>,
        <MenuItem value={"Facebook"} key={3} primaryText="Facebook"/>,
        <MenuItem value={"Holiday"} key={4} primaryText="Holiday"/>,
        <MenuItem value={"Calendar"} key={5} primaryText="Calendar"/>,
        <MenuItem value={"Website"} key={6} primaryText="Website"/>
    ],
    animationType: [
        <MenuItem value={"fade"} key={1} primaryText="fade"/>,
        <MenuItem value={"slide-right"} key={2} primaryText="slide-right"/>,
        <MenuItem value={"slide-left"} key={3} primaryText="slide-left"/>
    ],
    listAttraction: [
        <MenuItem value={"29/3 park"} key={1} primaryText="29/3 park"/>,
        <MenuItem value={"Ban Co Peak"} key={2} primaryText="Ban Co Peak"/>,
        <MenuItem value={"Asia Park"} key={3} primaryText="Asia Park"/>
    ],
    parameters: {
        Clock: [
            {key: "city", value: ""},
            {key: "utc-diff", value: ""}
        ],
        Weather: [
            {key: "city", value: ""},
            {key: "degrees", value: ""},
        ],
        Facebook: [
            {key: "url", value: "mgmTechnologyPartnersVietnam"},
            {key: "start-day", value: ""},
            {key: "end-day", value: ""},
        ],
        Holiday: [],
        Calendar: [
            {key: "name", value: ""},
            {key: "time-min", value: ""},
            {key: "time-max", value: ""},
            {key: "number-of-calendars", value: ""},
            {key: "calendar-id-1", value: ""},
            {key: "color-1", value: ""},
        ],
        Website: []
    }
};

export default data;
