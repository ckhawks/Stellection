import React, { useEffect, useState } from "react";
import { Image, Button, Tabs } from '@geist-ui/core';
import { useLocation, redirect, Link, useNavigate } from 'react-router-dom'; // NavLink, useNavigate

import './NavbarMenu.css';

// research sass vs scss 

import StellectionLogo from "../../assets/images/Logo.svg";

const NavbarMenu = (props) => {
    const location = useLocation();
    const [url, setUrl] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        setUrl(location.pathname.substring(1));
        
        console.log(location);
    }, [location]);

    useEffect(()=> {
        console.log("url: " + url);
    }, [url]);

    const navTabsChangeHandler = (value) => {
        console.log("clicked: ")
        console.log(value)
        navigate('/' + value);
    }

    return (
        <> 
            <div className="navbar-wrapper">
                <div className="navbar-center">
                    <div className={"navbar " + (props.wide ? "container-wide" : "container-regular")}>
                        <div className="navbar-logo">
                            <a href="/">
                                <Image height="32px" mr={.5} src={StellectionLogo} draggable={false} title="Logo" alt="Stellection"/>
                            </a>
                            
                        </div>
                        <div className="navbar-middle">
                            <Tabs initialValue={url} hideDivider hideBorder onChange={navTabsChangeHandler} value={url}>
                                <Tabs.Item label="Collect" value="geist-test" />
                                <Tabs.Item label="Organize" value="organize" /> 
                                <Tabs.Item label="Browse" value="gallery" />
                            </Tabs>
                        </div>
                        
                        <div className="navbar-right">
                            <Tabs initialValue={url} hideDivider hideBorder onChange={navTabsChangeHandler} value={url}>
                                <Tabs.Item label="Contact" value="contact" />
                                <Tabs.Item label="Login" value="login" />
                            </Tabs>
                            <Link to="/register">
                                <Button auto shadow type="secondary" ml=".5" /* onClick={redirect('/register') }*/><b>Sign Up</b></Button>
                            </Link>
                            
                        </div>
                        
                    </div>
                    <div className="navbar-border">
                        <div className="navbar-border-left" />
                        <div className="navbar-border-middle" />
                        <div className="navbar-border-right" />
                        
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default NavbarMenu;