import React, {  } from "react";
import { Card, Input, Spacer, Text, Link, Button } from '@geist-ui/core';
import {
    ArrowRight as ArrowRightIcon,
    User as UserIcon,
    Lock as LockIcon
} from '@geist-ui/icons'

const Login = () => {  

    // const [emailValue, setEmailValue] = useState('');
    // const emailChangeHandler = (e) => {
    //     setEmailValue(e.target.value);
    //     console.log("Email changed to " + e.target.value);
    // }

    return (
        <>
            <style jsx>
                {` .right-icon {
                    margin-left: 0px !important;
                }`}
            </style>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", height: "auto"}}>
            <Card width="400px" hoverable padding={2}>
                    <Text h1>Login</Text>
                    <Input placeholder="ArtGuy333" width="100%" icon={<UserIcon/>}>
                        Username or Email
                    </Input>
                    <Spacer />
                    <Input.Password placeholder="Password" width="100%" icon={<LockIcon/>}>
                        Password
                    </Input.Password>
                    {/* <Text font="12px" mt={0.2} mb={1} ml={0.2} light style={{fontWeight: 300}}>Password strength: <Spacer w={0.5} inline/><Dot font="12px" mt={0.2} mb={1} style={{ marginRight: '20px' }} type="success">Strong</Dot></Text> */}
                    <Spacer />
                    <Button shadow iconRight={<ArrowRightIcon/>} type="secondary" width="100%">Submit</Button>
                    <Card.Footer>
                        <Text>Don't have an account? </Text><Link color target="_blank" href="https://github.com/geist-org/geist-ui">Sign up</Link>
                    </Card.Footer>
                </Card> 
                            
                
            </div>
                
        </>
    );

}

export default Login;