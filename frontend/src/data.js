import React from 'react';
import Assessment from 'material-ui/svg-icons/action/assessment';
import Group from 'material-ui/svg-icons/social/group';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import AccountBalance from 'material-ui/svg-icons/action/account-balance';
import Exit from 'material-ui/svg-icons/action/exit-to-app'
import MenuItem from 'material-ui/MenuItem';

const data = {
    menus: [
        {text: 'Home', icon: <ActionHome/>, link: '/home/dashboard'},
        {text: 'Explore', icon: <Assessment/>, link: '/home/explore'},
        {text: 'My plans', icon: <ActionFlightTakeoff/>, link: '/home/plans'},
        {text: 'Profile', icon: <Group/>, link: '/home/profile'},
        {text: 'Sign out', icon: <Exit/>, link: '/login'}
    ],
    adminMenus: [
        {text: 'Attraction Management', icon: <Assessment/>, link: '/admin/attractions'},
        {text: 'Plan Management', icon: <ActionFlightTakeoff/>, link: '/admin/plans'},
        {text: 'User Management', icon: <Group/>, link: '/admin/users'},
        {text: 'Data Analysis', icon: <AccountBalance/>, link: '/admin/chart'},
        {text: 'Sign out', icon: <Exit/>, link: '/login'}
    ],
    listAttraction: [
        <MenuItem value={"29/3 park"} key={1} primaryText="29/3 park"/>,
        <MenuItem value={"Ban Co Peak"} key={2} primaryText="Ban Co Peak"/>,
        <MenuItem value={"Asia Park"} key={3} primaryText="Asia Park"/>
    ],
    plan: [
        {
            numberOfDay: 1,
            events: [
                {
                    'start-time': '9:00',
                    'end-time': '17:00',
                    attraction: {
                        address: "1 Phan Đăng Lưu, Hoà Cường Bắc, Hải Châu, Đà Nẵng",
                        description: "﻿- Open time: Monday to Sunday: 15:00 – 22:00 *Sun Group – one of Asia’s Premier Real Estate developers – has chosen the resort town of Da Nang, on Vietnam’s central coast to develop an original amusement and culture park named Sun World Danang Wonder (Asia Park). *The Amusement Park of Sun World Danang Wonder (Asia Park) brings together a complete package of rides, attractions, shows, restaurants and retail to allow for a wonderful evening out.",
                        favorite: null,
                        id: 3,
                        lat: 16.039258,
                        lng: 108.228534,
                        name: "Asia Park",
                        type: "Park"
                    }
                },
                {
                    'start-time': '17:00',
                    'end-time': '19:00',
                    attraction: {
                        address: "Lo 20, My Da Tay 2, Ngu Hanh Son",
                        description: '',
                        favorite: null,
                        id: 12,
                        lat: 16.03447,
                        lng: 108.239392,
                        name: "Nen Restaurant",
                        type: "Restaurant"
                    }
                },
                {
                    'start-time': '19:00',
                    'end-time': '20:30',
                    attraction: {
                        address: "98-96 Bach Dang, Da Nang",
                        description: '',
                        favorite: null,
                        id: 15,
                        lat: 16.069165,
                        lng: 108.224867,
                        name: "Nen Restaurant",
                        type: "Coffee"
                    }
                },
                {
                    'start-time': '20:30',
                    'end-time': '21:30',
                    attraction: {
                        address: "Nguyễn Văn Linh, An Hải Trung, Đà Nẵng",
                        description: '﻿The Dragon Bridge is a bridge with a dragon over the Han River at Da Nang, Vietnam. Dragon Bridge is 666m long, 37.5m wide and has six lanes for traffic.It opened to traffic on March 29, 2013, at a cost of nearly 1.5 trillion VND.\n' +
                        '            *Main span was completed on October 26, 2011. The bridge was opened to traffic on March 29, 2013, the 38th anniversary of the liberation of Da Nang City.\n' +
                        '            *With the lights changing, the bridge turns to many color. And with the lights reflections of the river water, the view is spectacular.',
                        favorite: null,
                        id: 4,
                        lat: 16.06121,
                        lng: 108.226976,
                        name: "Dragon Bridge",
                        type: "Bridge"
                    }
                }
            ]
        },
        {
            attraction: {
                address: "Thọ Quang, Sơn Trà, Đà Nẵng",
                description: "As the highest mountain on Son Tra Peninsula, Ban Co peak is one of tourist attractions of Da Nang city.↵            *There is a status of a god in front of the chess board. According to legend, there were 2 fairies playing chess on Son Tra Mountain.↵            *The best time to visit Ban Co peak is on the early morning when the whole city and Son Tra peninsula nature are still sleeping in glimmering sun. ",
                favorite: null,
                id: 2,
                lat: 16.118949,
                lng: 108.271949,
                name: "Ban Co Peak",
                type: "Tourist Attraction"
            }
        }
    ],
};

export default data;
