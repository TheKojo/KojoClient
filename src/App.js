import React, { Component, useState, useCallback } from 'react';
import { Layout } from './Layout';
import { Col, Container, Row, Navbar } from 'react-bootstrap';
import Sidebar from "react-bootstrap-sidebar-menu";
import './App.scss'
import Main from "./Main";
import { Sidenav, Nav } from "rsuite";
import { Icon } from '@rsuite/icons';
import { Gallery } from './Gallery';
import Home from './Home';
import ErrorPage from './Error';
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import Git from "@rsuite/icons/legacy/Github";

import logo from './images/logo130wiki.png';
import logoicon from './images/logoicon.svg';

import {
    Route, Link, Routes, BrowserRouter, NavLink, useNavigate
} from "react-router-dom";


const styles = {
    display: "inline-table"
};

const HeartSvg = React.forwardRef((props, ref) => (
    <svg {...props} width="2em" height="2em" fill="currentColor" viewBox="0 0 1024 1024" ref={ref}>
        <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
));


const CustomSidenav = ({
    page,
    appearance,
    openKeys,
    expanded,
    onOpenChange,
    onExpand,
    navigate,
    ...navProps
}) => {
    return (
        <Layout>
            <div style={styles} className="sidebar-menu">
                <Sidenav
                    appearance={appearance}
                    expanded={expanded}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                >
                    <Sidenav.Toggle onToggle={onExpand} />
                    <Sidenav.Body>
                        <Nav {...navProps}>
                            <Nav.Item eventKey="1" icon={<DashboardIcon />} onClick={useCallback(() => navigate('/', { replace: true }), [navigate])}>
                                Home
                            </Nav.Item>
                            <Nav.Menu eventKey="3" title="P-Spectrum">
                                
                                <Nav.Item eventKey="3-1">About</Nav.Item>
                                <Nav.Item eventKey="3-2" onClick={ useCallback(() => navigate('/gallery', { replace: true }), [navigate]) }>Gallery</Nav.Item>
                                
                                <Nav.Item eventKey="3-3">Patch Notes</Nav.Item>
                                <Nav.Item eventKey="3-4">Download</Nav.Item>
                            </Nav.Menu>
                            <Nav.Item eventKey="4" title="Settings" icon={<Git />} href='https://github.com/TheKojo'>
                                Github
                            </Nav.Item>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
            <Main>
                <Routes>
                    <Route exact path='/' element={<Home/>} />
                    <Route exact path='/gallery' element={<Gallery/>} />
                </Routes>
            </Main>
        </Layout>
    );
}



export default function App() {
    const [pageState, setState] = useState('gallery')
    const [activeKey, setActiveKey] = React.useState("1");
    const [openKeys, setOpenKeys] = React.useState(["3", "4"]);
    const [expanded, setExpand] = React.useState(true);

    const navigate = useNavigate();
    //const handleOnClick = useCallback(() => navigate('/gallery', { replace: true }), [navigate]);

    return (
        <>
            <CustomSidenav
                appearance='inverse'
                activeKey={activeKey}
                openKeys={openKeys}
                onSelect={setActiveKey}
                onOpenChange={setOpenKeys}
                expanded={expanded}
                onExpand={setExpand}
                page={pageState}
                navigate={navigate}
                //handleOnClick={handleOnClick}
            />
        </>
    );
};
