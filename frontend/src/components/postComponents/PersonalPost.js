import React,{useEffect} from 'react';
import Card from '../ui/Card';
import DeleteIcon from '@material-ui/icons/Delete';
import { CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import classes from './PostItem.module.css';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { deletePost } from '../../actions/posts';
import useStyles from './styles.js';
import { makeStyles } from '@material-ui/core/styles';




  const PersonalPost = ({ post, setCurrentId, user, setUser }) => {
  const dispatch = useDispatch();
  const classstyles = useStyles();
  // const user = JSON.parse(localStorage.getItem('name'));
  
 

  const handleOnSubmit = (e) =>{
    e.preventDefault();
    console.log(post._id, " post id");
    dispatch(deletePost({id: post._id}));
  }

return (
  <li className={classes.item}>
    <Card>
      <div className={classes.content}>
        <h3>{post.title}</h3>
        <div className={classstyles.details}>
      <Typography variant="body2" color="textSecondary" component="h2">{post.max}</Typography>
      <Typography variant="body2" color="textSecondary" component="h2">{post.max}</Typography>
      <Typography variant="body2" color="textSecondary" component="h2">{post.min}</Typography>
      <Typography variant="body2" color="textSecondary" component="h2">{post.wanttolive}</Typography>
          </div>
        <p>{post.description}</p>
      </div>
      <Button onClick={handleOnSubmit}>
          <DeleteIcon/>
      </Button>
      <div className={classes.actions}>
      <Button>Chat</Button>
      <p variant="body2">{moment(post.createdAt).fromNow()}</p>
     
      </div>
    </Card>
  </li>
);
}

export default PersonalPost;

