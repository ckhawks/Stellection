import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Spacer, Text, Link, Button } from "@geist-ui/core";
import {
  ArrowRight as ArrowRightIcon,
  User as UserIcon,
  Lock as LockIcon,
} from "@geist-ui/icons";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  // const [emailValue, setEmailValue] = useState('');
  // const emailChangeHandler = (e) => {
  //     setEmailValue(e.target.value);
  //     console.log("Email changed to " + e.target.value);
  // }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();

  const navigate = useNavigate();

  const submitLoginForm = async () => {
    await auth.login(username, password);
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("/collect");
    }
  }, [auth.isLoggedIn]);

  return (
    <>
      <style>
        {` .right-icon {
          margin-left: 0px !important;
        }`}
      </style>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          height: "auto",
        }}
      >
        <Card width="400px" hoverable padding={2}>
          <Text h1>Login</Text>
          <Input
            placeholder="ArtGuy333"
            width="100%"
            icon={<UserIcon />}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          >
            Username or Email
          </Input>
          <Spacer />
          <Input.Password
            placeholder="Password"
            width="100%"
            icon={<LockIcon />}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          >
            Password
          </Input.Password>
          {/* <Text font="12px" mt={0.2} mb={1} ml={0.2} light style={{fontWeight: 300}}>Password strength: <Spacer w={0.5} inline/><Dot font="12px" mt={0.2} mb={1} style={{ marginRight: '20px' }} type="success">Strong</Dot></Text> */}
          <Spacer />
          <Button
            shadow
            iconRight={<ArrowRightIcon />}
            type="secondary"
            width="100%"
            onClick={submitLoginForm}
          >
            Submit
          </Button>
          <Card.Footer>
            <Text>Don't have an account? </Text>
            <Link
              color
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign up
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
};

export default Login;
