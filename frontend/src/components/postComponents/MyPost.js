import React,{useState,useEffect} from 'react';
import classes from './PostList.module.css';
import { Paper,Typography } from '@material-ui/core';
import PersonalPost from './PersonalPost';
import Alert from '@material-ui/lab/Alert';

import { useSelector } from 'react-redux';



const MyPost = ({ currentId,setCurrentId, user, setUser }) => {
  const posts = useSelector((state) => state.posts);
  const [counter, setCounter]= React.useState(false);
  

  useEffect(() => {
    posts.map((post) => {
      console.log("here");
      console.log("Username: " + JSON.stringify(user?.username));
      /*console.log(post?.original_poster);*/
        if(post?.username === user?.username){
          setCounter(true);    
    }
    }
    )
  }, [posts]);

  if (!user) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to see your posts.
        </Typography>
      </Paper>
    );
  }
  

return (
  <>
  { counter ? (
<ul className={classes.list}>
  {posts.map((post) => {
    console.log("here");
    console.log("Username" + JSON.stringify(user?.username));
      if(post?.username === user?.username){
          return( <PersonalPost post={post}/>)
  }
  }
  )
}
</ul>
)
     :
    (
        <Alert severity="info">You have no Posts yet.  Add your own posts by going to the "Add Posts" page</Alert>
    )}
    </>
);
}

  

export default MyPost;
