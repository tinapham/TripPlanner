import React, {Component} from 'react';
import FacebookItem from './FacebookItem';
import './Facebook.css';

import {fetchAPIData} from '../../fetchAPIDataUtil';

const NUM_OF_POSTS = 2;
const EX_SECOND = 10;

class FacebookPage extends Component {

    constructor() {
        super();
        this.state = ({
            data: []
        });
    }

    async componentDidMount() {
        const DEFAULT_URL = `https://graph.facebook.com/${this.props.params.url}`;
        const ACCESS_TOKEN = `EAARPQIxk2QsBAGg0WshexQesN7UvFpTKrsZBPylDzhSuUkmnWZAZBtXlJ4qwdAXWaM62EgPfuHVo1FbTQXC8ZAvGEMz0uk0ZApxK6aXfGN6yu3qe1lnrN7F8Lmvii7ClxUzQb6Jj7UOpauC50iNZCUonsjILVif2wZD`;
        const FIELDS = 'name,description,full_picture,source,message,type,created_time';
        let FETCHING_DATA_URL = `${DEFAULT_URL}/posts?access_token=${ACCESS_TOKEN}&fields=${FIELDS}&limit=${NUM_OF_POSTS}`;
        //Check if facebook has time limit or default
        if (this.props.params['end-day'] && this.props.params['start-day']) {
            const TIME_LIMIT = `since=${this.props.params['start-day']}&until=${this.props.params['end-day']}`;
            FETCHING_DATA_URL = `${FETCHING_DATA_URL}&${TIME_LIMIT}`;
        }
        let value = await fetchAPIData('facebook', FETCHING_DATA_URL, EX_SECOND);
        if (value !== null) {
            this.setState({data: value.data,});
        }
    }

    getFacebookPost() {
        return this.state.data.map((item, index) => (
            <FacebookItem key={index} heightSize={this.props.heightSize} item={item}
                          widthSize={this.props.widthSize / 2}/>
        ));
    }

    getNavbar() {
        if (this.props.widthSize <= 992) {
            return (
                <div className='navbar-static-top small-navbar col-sm-12'>
                    <img src='images/fb-logo.png' alt=''/>
                    <img src='images/mgm-logo.svg' alt=''/>
                </div>
            );
        } else {
            return (
                <div className='col-md-1 big-navbar'>
                    <img src='images/fb-logo.png' className='img-responsive' alt=''/>
                    <img src='images/logo.png' className='img-responsive' alt=''/>
                </div>
            );
        }
    }

    render() {
        return (
            <div className='fb-main container-fluid'>
                {this.getNavbar()}
                <div className='col-md-11 col-sm-12' style={{height: `${this.props.heightSize * 0.9}px`}}>
                    {this.getFacebookPost()}
                </div>
            </div>
        );
    }
}

export default FacebookPage;