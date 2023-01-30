import React, { useEffect, useState } from "react";
import { Image, Button, Tabs, Avatar, Popover, Spacer } from "@geist-ui/core";
import { useLocation, Link, useNavigate } from "react-router-dom"; // NavLink, redirect
import { LogOut as LogOutIcon, User as UserIcon } from "@geist-ui/icons";

import "./NavbarMenu.css";

// research sass vs scss

import StellectionLogo from "../../assets/images/Logo.svg";
import TestAvatar from "../../assets/images/test-avatar.gif";

const NavbarMenu = (props) => {
  const location = useLocation();
  const [url, setUrl] = useState(null);
  let navigate = useNavigate();

  const loggedIn = true;

  useEffect(() => {
    setUrl(location.pathname.substring(1));

    console.log(location);
  }, [location]);

  useEffect(() => {
    console.log("url: " + url);
  }, [url]);

  const navTabsChangeHandler = (value) => {
    console.log("clicked: ");
    console.log(value);
    navigate("/" + value);
  };

  const avatarPopoverContent = (
    <>
      <div className="current-user-popover">
        <Popover.Item width={"auto"}>
          <UserIcon size={20} /> <Spacer inline w={0.35} />
          Signed in as <Spacer inline w={0.25} />
          <b>Stellaric</b>
        </Popover.Item>
        <Popover.Item line />
        <Popover.Item>
          <Link to="#">Your profile</Link>
        </Popover.Item>
        <Popover.Item>
          <Link color to="#">
            Settings
          </Link>
        </Popover.Item>
        <Popover.Item>
          <Link color to="#">
            Admin settings
          </Link>
        </Popover.Item>
        {/* <Popover.Item>
                    <span>Command-Line</span>
                </Popover.Item> */}
        <Popover.Item line />
        <Popover.Item>
          <Link to="/login">Temp: Login</Link>
        </Popover.Item>
        <Popover.Item>
          <Link color to="/register">
            Temp: Register
          </Link>
        </Popover.Item>
        <Popover.Item line />
        <Popover.Item>
          <Link to="/logout">
            <LogOutIcon size={20} /> <Spacer inline w={0.35} />
            Logout
          </Link>
        </Popover.Item>
        <style jsx>{`
          .tooltip-content.popover > .inner {
            padding-top: 7px;
            padding-bottom: 7px;
          }

          .current-user-popover > .item > * {
            display: flex;
            flex-direction: row;
            align-items: center;
            // white-space: nowrap;
          }

          .current-user-popover > .item {
            white-space: nowrap;
          }

          .current-user-popover > .item:hover:not(.line) {
            background-color: #e00;
          }

          .current-user-popover > .item:hover > a {
            color: black;
          }
        `}</style>
      </div>
    </>
  );

  return (
    <>
      <div className="navbar-wrapper">
        <div className="navbar-center">
          <div
            className={
              "navbar " + (props.wide ? "container-wide" : "container-regular")
            }
          >
            <div className="navbar-logo">
              <Link to="/">
                <Image
                  height="32px"
                  mr={0.5}
                  src={StellectionLogo}
                  draggable={false}
                  title="Logo"
                  alt="Stellection"
                />
              </Link>
              <Tabs
                initialValue={url}
                hideDivider
                hideBorder
                onChange={navTabsChangeHandler}
                value={url}
              >
                <Tabs.Item label="Geist Test" value="geist-test" />
              </Tabs>
            </div>
            <div className="navbar-middle">
              <Tabs
                initialValue={url}
                hideDivider
                hideBorder
                onChange={navTabsChangeHandler}
                value={url}
              >
                <Tabs.Item label="Collect" value="collect" />
                <Tabs.Item label="Organize" value="organize" />
                <Tabs.Item label="Browse" value="browse" />
                <Tabs.Item label="Gallery" value="gallery" />
              </Tabs>
            </div>

            <div className="navbar-right">
              {!loggedIn && (
                <>
                  <Tabs
                    initialValue={url}
                    hideDivider
                    hideBorder
                    onChange={navTabsChangeHandler}
                    value={url}
                  >
                    <Tabs.Item label="Contact" value="contact" />
                    <Tabs.Item label="Login" value="login" />
                  </Tabs>
                  <Link to="/register">
                    <style jsx>{`
                      .btn:hover {
                        background-color: white !important;
                        color: black !important;
                      }
                    `}</style>
                    <Button auto shadow type="secondary" ml=".5">
                      <b>Sign Up</b>
                    </Button>
                  </Link>
                </>
              )}
              {loggedIn && (
                <>
                  <Tabs
                    initialValue={url}
                    hideDivider
                    hideBorder
                    onChange={navTabsChangeHandler}
                    value={url}
                  >
                    <Tabs.Item label="Contact" value="contact" />
                  </Tabs>
                  <Spacer inline w={0.7} />

                  <Popover
                    className="current-user-popover"
                    content={avatarPopoverContent}
                    width="200px"
                    placement="bottomEnd"
                  >
                    <Avatar
                      src={TestAvatar}
                      width="30px"
                      height="30px"
                      style={{ cursor: "pointer" }}
                    />
                  </Popover>
                </>
              )}
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
};

export default NavbarMenu;
