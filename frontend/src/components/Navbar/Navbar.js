import React, { useState, useEffect } from "react";
import "./styles.css";
// import "./scriptcss.js";
import logo from "./logo4.png";
import menu from "./stack.png";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import classes from "./MainNavigation.module.css";

import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
//import decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";

import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";

const Navbar = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ul>
          <li>
            <Link to="/Blog">Post Page</Link>
          </li>
          <li>
            <Link to="/NewPost">Add Post</Link>
          </li>
          <li>
            <Link to="/MyPost">My Post</Link>
          </li>
          <li>
            <Link to="/Map">Map</Link>
          </li>
          <li>
            <Link to="/MyProfile">My Profile</Link>
          </li>
        </ul>
        <div>
          {username ? (
            <li onClick={logout}>Logout</li>
          ) : (
            <li>
              <Link to="/Auth">Login</Link>
            </li>
          )}
        </div>
      </List>
    </div>
  );

  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  useEffect(async () => {
    setUserName(await JSON.parse(localStorage.getItem("userInfo")));
  }, [navigate]);

  const dispatch = useDispatch();
  const location = useLocation();

  const classess = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    //localStorage.setItem("userInfo", JSON.stringify(""));
    localStorage.removeItem("userInfo");
    //props.setUser(undefined);
    // props.history.push("/Auth");
    navigate("/Auth");
  };

  useEffect(() => {
    console.log(username + "user");
  }, []);

  const stringifiedPerson = localStorage.getItem("name");
  const personAsObjectAgain = JSON.parse(stringifiedPerson);

  return (
    <div>
      <AppBar position="static">
        <header>
          <img class="logo" src={logo} width="180"></img>
          <ul class="navbar">
            <li>
              <Link to="/Blog">Post Page</Link>
            </li>
            <li>
              <Link to="/NewPost">Add Post</Link>
            </li>
            <li>
              <Link to="/MyPost">My Post</Link>
            </li>
            <li>
              <Link to="/Map">Map</Link>
            </li>
            <li>
              <Link to="/MyProfile">My Profile</Link>
            </li>
          </ul>
          <div class="main">
            {username ? (
              <div className={classess.profile}>
                <Button
                  id="authButton"
                  variant="contained"
                  className={classess.logout}
                  color="secondary"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                id="authButton"
                component={Link}
                to="/Auth"
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
            )}
            <div id="menu-icon">
              {["MENU"].map((anchor) => (
                <React.Fragment key={anchor}>
                  <MenuIcon onClick={toggleDrawer(anchor, true)}>
                    {anchor}
                  </MenuIcon>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
            </div>
          </div>
        </header>
      </AppBar>
    </div>
  );
};

export default Navbar;
