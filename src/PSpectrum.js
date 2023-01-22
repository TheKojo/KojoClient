import React, { Component, useState, useCallback } from 'react';
import { Layout } from './Layout';
import { Col, Container, Row, Navbar } from 'react-bootstrap';
import Sidebar from "react-bootstrap-sidebar-menu";
import './App.scss'
import Main from "./Main";
import { Gallery } from './Gallery';
import Home from './Home';
import logo from './images/logo.png';

import {
    Route, Link, Routes, BrowserRouter, NavLink, useNavigate
} from "react-router-dom";





export default function PSpectrum() {

    return (
        <div>
            <img src={logo} className='logo' alt='' />
            <Gallery />
        </div>
    );
};
