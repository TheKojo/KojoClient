import React from 'react';
import './App.scss'
import  Gallery  from './Gallery';
import Home from './Home';
import ComingSoon from './ComingSoon';
import logo from './images/logo.png';
import './PSpectrum.css';


export default function PSpectrum() {

    return (
        <div id="mainWrapper">
            <img src={logo} className='logo' alt='' />
            <br/>
            <h3>About</h3>
            <hr className="solid" />
            <div id="about" className='homeComponent'>
                <Home />
            </div>
            <h3>Coming Soon</h3>
            <hr className="solid" />
            <div id="comingsoon" className='soonComponent'>
                <ComingSoon />
            </div>
            <h3>Creature Index</h3>
            <hr className="solid"/>
            <div id="gallery" className='galleryComponent' >
                <Gallery />
            </div>
        </div>
    );
};
