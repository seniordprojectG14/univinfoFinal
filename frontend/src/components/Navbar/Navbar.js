import React, { useState, useEffect } from "react";

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

  // useEffect(() => {
  //     const token = props.user?.token;

  //     if (token) {
  //       const decodedToken = decode(token);

  //       if (decodedToken.exp * 1000 < new Date().getTime()) logout();
  //     }

  //     props.setUser(JSON.parse(localStorage.getItem('name')));
  //   }, [location]);

  const stringifiedPerson = localStorage.getItem("name");
  const personAsObjectAgain = JSON.parse(stringifiedPerson);

  return (
    // <header className={classes.header}>
    //   <div className={classes.logo}>univinfo</div>
    // <nav>
    //   <ul>
    //     <li>
    //       <Link to="/Blog">Post Page</Link>
    //     </li>
    //     <li>
    //       <Link to="/NewPost">Add Post</Link>
    //     </li>
    //     <li>
    //       <Link to="/MyPost">My Post</Link>
    //     </li>
    //     <li>
    //       <Link to="/Chats">Chat</Link>
    //     </li>
    //     <li>
    //       <Link to="/Map">Map</Link>
    //     </li>
    //     <li>
    //       <Link to="/MyProfile">MyProfile</Link>
    //     </li>
    // <li>
    //     {username ? (
    //       <div className={classess.profile}>
    //         {/* <Avatar className={classess.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
    //     <Typography className={classess.userName} variant="h6">{user?.result.name}</Typography> */}
    //         <Button
    //           variant="contained"
    //           className={classess.logout}
    //           color="secondary"
    //           onClick={logout}
    //         >
    //           Logout
    //         </Button>
    //       </div>
    //     ) : (
    //       <Button
    //         component={Link}
    //         to="/Auth"
    //         variant="contained"
    //         color="primary"
    //       >
    //         Sign In
    //       </Button>
    //     )}
    //   </li>
    //     </ul>
    //   </nav>
    // </header>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>

        <img src="https://www.clipartmax.com/png/small/419-4198860_open-connecticut-uconn-huskies-logo.png"></img>

        <header className={classes.header}>
          <nav>
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
                <Link to="/Chats">Chat</Link>
              </li>
              <li>
                <Link to="/Map">Map</Link>
              </li>
              <li>
                <Link to="/MyProfile">My Profile</Link>
              </li>
              <li>
                {username ? (
                  <div className={classess.profile}>
                    <Button
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
                    component={Link}
                    to="/Auth"
                    variant="contained"
                    color="primary"
                  >
                    Sign In
                  </Button>
                )}
              </li>
            </ul>
          </nav>
        </header>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
