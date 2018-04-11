import '../scss/base.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import domReady from 'domready';
import GoogleMaps from 'google-maps';

domReady(()=> {
    GoogleMaps.LIBRARIES = ['places'];
    GoogleMaps.KEY='AIzaSyBoBn50H-U0yGXvxhZstPQANsCjDaQgbYE';
    GoogleMaps.load((google)=> {
        ReactDOM.render(<App mapService={google}/>,
            document.getElementById('app'));
    });

});
