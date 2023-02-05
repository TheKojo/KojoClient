import React, { useState, useCallback, useEffect } from 'react';
import { Layout } from './Layout';
import './App.scss'
import Main from "./Main";
import { Sidenav, Nav } from "rsuite";
import  Gallery  from './Gallery';
import PSpectrum from './PSpectrum';
import ErrorPage from './Error';
import DashboardIcon from "@rsuite/icons/legacy/Info";
import GameIcon from "@rsuite/icons/legacy/Gamepad";
import Git from "@rsuite/icons/legacy/Github";


import {
    Route, Routes, useNavigate, useLocation
} from "react-router-dom";


const styles = {
    display: "inline-table"
};


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
            <div className="main-header">
                    Created by Asante Nyamekye
            </div>
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
                            <Nav.Item eventKey="1" onClick={useCallback(() => navigate('/#about', { replace: true }), [navigate])} icon={<DashboardIcon />}>
                                About
                            </Nav.Item>
                            <Nav.Menu eventKey="3" title="P-Spectrum" icon={<GameIcon />}>
                                <Nav.Item eventKey="3-1" onClick={useCallback(() => navigate('/#comingsoon', { replace: true }), [navigate])}>Coming Soon</Nav.Item>
                                <Nav.Item eventKey="3-2" onClick={useCallback(() => navigate('/#gallery', { replace: true }), [navigate]) }>Gallery</Nav.Item>
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
                    <Route exact path='/' element={<PSpectrum/>} />
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
    const [expanded, setExpand] = React.useState(false);

    const navigate = useNavigate();

    const { pathname, hash, key } = useLocation();
    useEffect(() => {
        if (hash === '') {
            window.scrollTo(0, 0);
        }
        else {
            setTimeout(() => {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 0);
        }
    }, [pathname, hash, key]);

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
            />
        </>
    );
};
