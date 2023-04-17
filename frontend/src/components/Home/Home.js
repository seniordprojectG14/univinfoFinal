import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Button } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import NewPost from "../postComponents/NewPost.js";
import PostList from "../postComponents/PostList.js";
//import AllMeetupsPage from '../../pages/AllMeetups';
//import Layout from '../layout/NewLayout';
import Navbar from "../Navbar/Navbar";
import Navbar2 from "../Navbar/navbar2.js";
//import Auth from '../Auth/Auth.js';
//import { getUsers } from '../../actions/posts';
import MyPost from "../postComponents/MyPost";
//import Chat from '../../pages/Chat';
import Chatpage from "../../Pages/Chatpage";
import Homepage from "../../Pages/Homepage";
import GoogleMaps from "../map/GoogleMaps";
import MapList from "../map/MapList";
import { useSelector } from "react-redux";
import MyProfile from "../postComponents/myProfile/MyProfile";
import ResponsiveAppBar from "../Navbar/navbar2.js";
//import SetAvatar from '../SetAvatar';

const Home = (props) => {
  //const [user, setUser] = useState(JSON.parse(localStorage.getItem("name")));

  const [username, setUserName] = useState("");
  useEffect(async () => {
    setUserName(await JSON.parse(localStorage.getItem("userInfo")));
  }, []);
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  //  useEffect(() => {
  //   dispatch(getUsers());
  // }, [currentId, dispatch]);

  useEffect(async () => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <div>
      <Navbar user={username} setUser={setUserName} />
      {/* <ResponsiveAppBar /> */}
      <Routes>
        <Route path="Auth" element={<Homepage />} />
        <Route
          path="Blog"
          element={
            <PostList
              currentId={props.currentId}
              setCurrentId={props.setCurrentId}
              user={username}
              setUser={setUserName}
            />
          }
        />

        <Route
          path="NewPost"
          element={
            <NewPost
              currentId={props.currentId}
              setCurrentId={props.setCurrentId}
              user={username}
              setUser={setUserName}
            />
          }
        />

        <Route
          path="MyPost"
          element={
            <MyPost
              currentId={props.currentId}
              setCurrentId={props.setCurrentId}
              user={username}
              setUser={setUserName}
            />
          }
        />
        <Route
          path="Map"
          element={
            <GoogleMaps
              currentId={props.currentId}
              setCurrentId={props.setCurrentId}
            />
          }
        />
        <Route
          path="MyProfile"
          element={
            <MyProfile
              currentId={props.currentId}
              setCurrentId={props.setCurrentId}
              user={username}
              setUser={setUserName}
            />
          }
        />
        {/* <Route path="SetAvatar" element={<SetAvatar/>}/> */}
        <Route path="chats" element={<Chatpage />} />
      </Routes>
    </div>
  );
};

export default Home;
