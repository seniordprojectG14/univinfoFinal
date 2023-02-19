import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import classes from './NewPost.module.css';
import { Typography, Paper,Button } from '@material-ui/core';

import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import useStyles from './styles';

import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PostForm from './PostForm';









const NewPost = ({ currentId, setCurrentId, user, setUser }) => {
  
  const post = useSelector((state) => (currentId ? state.posts.find((description) => description._id === currentId) : null));

  const [postData, setPostData] = useState({selectedFile: '', description: '', username: '', original_poster: ''});

  const [username, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(localStorage.getItem("userInfo")
      )
    );
  }, []);

  
  
    useEffect(() => {
      if (post) setPostData(post);
    }, [post]);

  if (!username) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign in to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <Card>
  <PostForm currentId={currentId} setCurrentId={setCurrentId} user={user} setUser={setUser}/>
  </Card>
  </>
  );
}

export default NewPost;
