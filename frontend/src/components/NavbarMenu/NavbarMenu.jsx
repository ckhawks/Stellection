import React, { useEffect, useState } from "react";
import { Image, Button, Tabs } from '@geist-ui/core';

import './NavbarMenu.css';

// research sass vs scss 

import StellectionLogo from "../../images/Logo.svg";

const NavbarMenu = (props) => {
    return (
        <> 
            <div className="navbar-wrapper">
                <div className="navbar-center">
                    <div class="navbar">
                        <div class="navbar-logo">
                            <a href="#">
                                <Image height="32px" mr={.5} src={StellectionLogo} draggable={false} title="Logo" alt="Stellection"/>
                            </a>
                            
                        </div>
                        <div class="navbar-middle">
                            <Tabs initialValue="" hideDivider hideBorder>
                                <Tabs.Item label="Collect" value="collect" />
                                <Tabs.Item label="Organize" value="organize" />
                                <Tabs.Item label="Browse" value="browse" />
                            </Tabs>
                        </div>
                        
                        <div class="navbar-right">
                            <Tabs initialValue="" hideDivider hideBorder rightSpace={0.5}>
                                <Tabs.Item label="Contact" value="contact" />
                                <Tabs.Item label="Login" value="login" />
                            </Tabs>
                            <Button auto shadow type="secondary" ml=".5"><b>Sign Up</b></Button>
                        </div>
                        
                    </div>
                    <div class="navbar-border">
                        <div class="navbar-border-left" />
                        <div class="navbar-border-middle" />
                        <div class="navbar-border-right" />
                        
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default NavbarMenu;