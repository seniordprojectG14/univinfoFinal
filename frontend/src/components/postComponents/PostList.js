import React,{useRef,useState,useEffect} from 'react';
import classes from './PostList.module.css';
import PostChain from './PostChain'
import { useSelector } from 'react-redux';




  const PostList = ({ setCurrentId, user }) => {
    const posts = useSelector((state) => state.posts);
   
  return (

    <div className="main">
<ul className={classes.list}>
  {posts?.map((post) => {
     return(
       <PostChain  post={post}  setCurrentId={setCurrentId} user={user}/>
   );
  })}
</ul>
    </div>
  );
}

export default PostList;
