import React, { useState } from "react";
import { Card, Input, Spacer, Text, Link, Button } from '@geist-ui/core';
import {
    ArrowRight as ArrowRightIcon,
    Check as CheckIcon,
    Slash as SlashIcon,
    User as UserIcon,
    Lock as LockIcon,
    Mail as MailIcon
} from '@geist-ui/icons'

const RegisterPage = () => {
    const [emailValue, setEmailValue] = useState('');
    const emailChangeHandler = (e) => {
        setEmailValue(e.target.value);
        console.log("Email changed to " + e.target.value);
    }

    return (
        <>
            <style jsx>
                {` .right-icon {
                    margin-left: 0px !important;
                }`}
            </style>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", height: "auto"}}>
                <Card width="400px" hoverable padding={2}>
                    <Text h1>Sign Up</Text>
                    <Input placeholder="ArtGuy333" width="100%" icon={<UserIcon/>}>
                        Username
                    </Input>
                    <Spacer />
                    <Input value={emailValue} onChange={emailChangeHandler} placeholder="artguy@stellection.com" width="100%" icon={<MailIcon/>}>
                        Email
                    </Input>
                    <Spacer />
                    
                    <Input.Password placeholder="Password" width="100%" icon={<LockIcon/>}>
                        Password
                    </Input.Password>
                    <Spacer />
                    <Button shadow iconRight={<ArrowRightIcon/>} type="secondary" width="100%" style={{ textTransform: "none"}}>Join the fun</Button>
                    <Card.Footer>
                        <Text>Already have an account? </Text><Link color underline target="_blank" href="https://github.com/geist-org/geist-ui">Login</Link>
                    </Card.Footer>
                </Card>
                {  false == true && 
                <>
                <Spacer />
                <Card width="400px" hoverable padding={2}>
                    <Text h1>Sign Up</Text>
                    <Input placeholder="artguy333" width="100%" icon={<CheckIcon color="blue" />} type="success">
                        Username
                    </Input>
                    <Spacer />
                    <Input value={emailValue} onChange={emailChangeHandler} placeholder="artguy@stellection.com" width="100%" type="error" icon={<SlashIcon color="red" />}>
                        Email 
                    </Input>
                    <Text type="error" font="12px" mt={0.2} mb={1}>An account already exists with that email.</Text>
                    {/* <Spacer /> */}
                    <Input.Password placeholder="Password" width="100%" icon={<CheckIcon />}>
                        Password
                    </Input.Password>
                    {/* <Text font="12px" mt={0.2} mb={1} ml={0.2} light style={{fontWeight: 300}}>Password strength: <Spacer w={0.5} inline/><Dot font="12px" mt={0.2} mb={1} style={{ marginRight: '20px' }} type="success">Strong</Dot></Text> */}
                    <Spacer />
                    <Button shadow loading iconRight={<ArrowRightIcon/>} type="secondary" width="100%">Submit</Button>
                    <Card.Footer>
                        <Text>Already have an account? </Text><Link color underline target="_blank" href="https://github.com/geist-org/geist-ui">Sign in</Link>
                    </Card.Footer>
                </Card>
                <Spacer />
                
                </>
                }   
            </div>
        </>
    );
}

export default RegisterPage;