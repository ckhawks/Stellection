import React, { useEffect, useState } from "react";
import { Text, Page, Button, Spacer, Tabs } from '@geist-ui/react';
import { Power, Github, Twitch as TwitchIcon, Twitter as TwitterIcon } from '@geist-ui/icons';

import NavbarMenu from "../../components/NavbarMenu/NavbarMenu";
import Footer from '../../components/Footer/Footer';

import './Geist-UI-Custom.css';
import BaseLayout from "../BaseLayout";

// https://github.com/manuanish/manuanish.github.io

const GeistTestContainer = (props) => {
    const [ buttonLoading, setButtonLoading ] = useState(false);

    const onButton1Click = () => {
        setButtonLoading(!buttonLoading);
    }

    return (
        <>
            <BaseLayout>

            
            <h2>Geist test lol</h2>
            <Button type="secondary">button</Button>
            
            </BaseLayout>
            {/* <Page>
                
                <div class="menu-wrapper">
                    <nav class="menu">
                        <div class="content">
                            <div class="navbar-logo">
                                Stellection
                            </div>
                            <div class="navbar-middle">
                                <Tabs initialValue="html" hideDivider hideBorder leftSpace={0}>
                                    <Tabs.Item label="HTML" value="html">
                                        
                                    </Tabs.Item>
                                    <Tabs.Item label="CSS" value="css">
                                    
                                    </Tabs.Item>
                                </Tabs>
                            </div>
                            <div class="navbar-right">
                                Right Links
                                <Button auto shadow type="secondary"><b>Sign Up</b></Button>
                            </div>
                        </div>
                    </nav>
                </div>
                <div class="layout">
                    <aside class="sidebar">
                        <div class="content">
                            sidebar lol
                        </div>

                    </aside>
                    <main class="main">
                        <Page.Content class="content">
                            <Text p>
                                hey
                                <Spacer w={.5} inline/>
                                <Button auto shadow type="success" onClick={onButton1Click} icon={<Power/>} >Fetch</Button>
                                <Spacer h={.5}/>
                                <Button auto shadow type="success" loading={buttonLoading} iconRight={<Power/>}>Fetch</Button>
                                <Spacer h={.5}/>
                                <Github color="red"/>
                            </Text>
                        </Page.Content>
                    </main>
                </div>
                
                
                <Page.Footer>
                    <h3>Footer</h3>
                </Page.Footer>
            </Page> */}
        </>
    );
}

export default GeistTestContainer;