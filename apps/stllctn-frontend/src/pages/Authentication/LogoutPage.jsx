import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Spacer, Text, Link, Button } from "@geist-ui/core";
import {
  ArrowRight as ArrowRightIcon,
  User as UserIcon,
  Lock as LockIcon,
} from "@geist-ui/icons";
import { useAuth } from "../../contexts/AuthContext";

const Logout = () => {
  // const [emailValue, setEmailValue] = useState('');
  // const emailChangeHandler = (e) => {
  //     setEmailValue(e.target.value);
  //     console.log("Email changed to " + e.target.value);
  // }

  const auth = useAuth();
  auth.logout();

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/collect");
    }
  }, [auth.isLoggedIn]);

  return <>Logging out...</>;
};

export default Logout;
