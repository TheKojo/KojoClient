import React, { Component, useState, useCallback } from 'react';
import { Layout } from './Layout';
import { Col, Container, Row, Navbar } from 'react-bootstrap';
import Sidebar from "react-bootstrap-sidebar-menu";
import './App.scss'
import Main from "./Main";
import { Gallery } from './Gallery';
import Home from './Home';
import ComingSoon from './ComingSoon';
import logo from './images/logo.png';
import './PSpectrum.css';

import {
    Route, Link, Routes, BrowserRouter, NavLink, useNavigate
} from "react-router-dom";





export default function PSpectrum() {

    return (
        <div id="mainWrapper">
            <img src={logo} className='logo' alt='' />
            <br/>
            <h3>About</h3>
            <hr class="solid" />
            <div id="about" className='homeComponent'>
                <Home />
            </div>
            <h3>Coming Soon</h3>
            <hr class="solid" />
            <div id="comingsoon" className='soonComponent'>
                <ComingSoon />
            </div>
            <h3>Creature Index</h3>
            <hr class="solid"/>
            <div id="gallery" className='galleryComponent' >
                <Gallery />
            </div>
        </div>
    );
};
