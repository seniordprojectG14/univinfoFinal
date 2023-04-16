import React, { useState, useEffect } from "react";
import Card from '../ui/Card';
import DeleteIcon from '@material-ui/icons/Delete';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import classes from './PostItem.module.css';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { deletePost } from '../../actions/posts';
import useStyles from './styles.js';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { deAnon } from '../../actions/posts';
import { useNavigate } from "react-router-dom";
import { handleBan } from '../../api/univIndex.js';
import { handleBreakpoints } from '@mui/system';




  const PersonalPost = ({ post, setCurrentId, user, setUser }) => {
  const dispatch = useDispatch();
  const classstyles = useStyles();
  //const userName = JSON.parse(localStorage.getItem('name'));
  //console.log(userName)

  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  useEffect(async () => {
    setUserName(await JSON.parse(localStorage.getItem("userInfo")));
  }, [navigate]);


  const handleOnSubmit = (e) =>{
    e.preventDefault();
    console.log(post._id, " post id");
    dispatch(deletePost({id: post._id}));
  }

  const handleDeAnon = (e) =>{

    e.preventDefault();
    console.log(post._id, " post id");
    dispatch(deAnon({id: post._id}));
  }

  const handleBan = (e) =>{
    e.preventDefault();
    console.log("BAN HAMMER SWUNG");
    dispatch(handleBan({username: post.username}));
  }



return (
  <li className={classes.item}>
    <Card>
      <div className={classes.content}>
        <h1><b>Username:</b> {post.username}</h1>
        <div className={classstyles.details}>
      <Typography variant="body2" color="textSecondary" component="h2">{post.max}</Typography>
      <Typography variant="body2" color="textSecondary" component="h2">{post.max}</Typography>
      <Typography variant="body2" color="textSecondary" component="h2">{post.min}</Typography>
      <Typography variant="body2" color="textSecondary" component="h2">{post.wanttolive}</Typography>
          </div>
        <p><b>Post Content:</b> {post.description}</p>
        
      </div>
      <div className={classes.actions}>
      <Button onClick={handleOnSubmit}>
          <DeleteIcon/>
          <p>delete post</p>
      </Button>
            
            {(post.original_poster === "Anonymous user") && username.isAdmin ? (
 
              <Button onClick={handleDeAnon}>
                <ManageAccountsIcon/>
                <p>de-anon post</p>
              </Button>
      
            ) : (
              <div>         
              </div>
            )}



      </div>
      <div className={classes.actions}>
      <p variant="body2">{moment(post.createdAt).fromNow()}</p>
     
      </div>
    </Card>
  </li>
);
}

export default PersonalPost;

