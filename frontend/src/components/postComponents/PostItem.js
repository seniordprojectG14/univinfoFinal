import React,{useEffect, useState} from 'react';
import Card from '../ui/Card';
import { CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import classes from './PostItem.module.css';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import useStyles from './styles.js';
import Geocode from "react-geocode";
import { likePost, deletePost, dislikePost,addUser, subUsernameLikes,subUsernameDisLikes, addLike, addDisLike, missPost, addMiss } from '../../actions/posts';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';


const PostItem = ({ post, setCurrentId, user, setUser,proplist }) => {
  const classstyles = useStyles();
  const dispatch = useDispatch();
  const [lat, setLat] = React.useState('');
  const [lng, setLng] = React.useState('');
  useEffect(() => {

    Geocode.setLanguage("en");
  Geocode.setApiKey("AIzaSyBBoDTa2K0ql0d3ssnlMEYXdBvQLI6_LqA");
  Geocode.fromAddress(post.address).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      setLat(lat);
      setLng(lng);
    },
    (error) => {
      console.error(error);
    }
  );
  }, []);

  const usernameNotInList = (usernameList, username) => {
    return !usernameList.includes(username);
  }
  Geocode.fromLatLng("48.8583701", "2.2922926").then(
    (response) => {
      const address = response.results[0].formatted_address;
      console.log(address);
    },
    (error) => {
      console.error(error);
    }
  );

  
  const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));
  
  
  const dispatchBothActions = async(postId, count, username, postListDisLikeUsernames, post) => {
    dispatch(addDisLike(postId, count, username, postListDisLikeUsernames, post));
    //await wait(2000);
   dispatch(dislikePost(postId, count, username, postListDisLikeUsernames, post));
    
    dispatch(subUsernameLikes(postId, count, username, postListDisLikeUsernames, post));

  };

  const dispatchBothActionsLike = async(postId, count, username, postListDisLikeUsernames, post) => {
    dispatch(addLike(postId, count, username, postListDisLikeUsernames, post));
   //await wait(2000);
    dispatch(likePost(postId, count, username, postListDisLikeUsernames, post));
  
    dispatch(subUsernameDisLikes(postId, count, username, postListDisLikeUsernames, post));
    
  };
  const dispatchBothActionsMiss = async(postId, count, username, postListMissUsernames, post) => {
    dispatch(missPost(postId, count, username, postListMissUsernames, post));
   //await wait(2000);
    dispatch(addMiss(postId, count, username, postListMissUsernames, post));
  

    
  };
  
    return(
      <li className={classes.item}>
      <Card>
      <CardMedia className={classes.media} image={post?.photo || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post?.photo} />
        <div className={classes.content}>


          
        <h3>address:{post?.address}</h3>
          <div className={classstyles.details}>
        <div style={{textalign: 'center',
            paddingLeft: '480px'}}>
        <img src={post?.photos[0]}  height={'200px'} width={'300px'} alt="BigCo Inc. logo"/>
        </div>
    
    
        <Typography variant="body2" color="textSecondary" component="h2">username:{post?.original_poster}</Typography>
            </div>
          <p>description: {post?.description}</p>
        </div>
        <div className={classes.actions}>
{post?.postListLikeUsernames.includes(user?.username) &&
  <Button size="small" color="secondary" onClick={() =>{
         dispatchBothActionsLike(post?._id, post?.likeCount, user?.username, post?.postListDisLikeUsernames, post);
         }}><ThumbUpAltIcon  color="secondary" fontSize="small" /> Like </Button>


}
{usernameNotInList(post?.postListLikeUsernames, user?.username)&&
  <Button size="small" color="secondary" onClick={() =>{
         dispatchBothActionsLike(post?._id, post?.likeCount, user?.username, post?.postListDisLikeUsernames, post);
         }}><ThumbUpAltIcon  fontSize="small" /> Like </Button>
}



        

       
        <Button>{post?.likeCount}</Button>
        {/* <Button>{post?.missCount}</Button> */}



        {post?.postListDisLikeUsernames.includes(user?.username) &&
        <Button size="small" color="primary"onClick={() => {
        dispatchBothActions(post?._id, post?.likeCount, user?.username, post?.postListDisLikeUsernames, post);
        }}

      
      ><ThumbDownIcon color="secondary" fontSize="small" /> disLike </Button>

}
{usernameNotInList(post?.postListDisLikeUsernames, user?.username)&&
        <Button size="small" color="primary"onClick={() => {
        dispatchBothActions(post?._id, post?.likeCount, user?.username, post?.postListDisLikeUsernames, post);
        }}

      
      ><ThumbDownIcon fontSize="small" /> disLike </Button>

}
        
        <p variant="body2">{moment(post?.createdAt)?.fromNow()}</p>
        
       
        <Button

onClick={() =>{
  dispatchBothActionsMiss(post?._id, post?.MissCount, user?.username, post?.postListMissUsernames, post);
  }}
        
        >misinformation:{post?.postListMissUsernames?.length}</Button>
        
    
        </div>
      </Card>
    </li>

    );
    }
    
    
export default PostItem;


