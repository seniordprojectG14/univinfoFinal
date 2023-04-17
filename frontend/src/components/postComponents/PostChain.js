import React,{useEffect, useState} from 'react';
import PostItem from './PostItem';




  const PostChain = ({post, setCurrentId, user, setUser }) => {


 



        return(
            <PostItem post={post} setCurrentId={setCurrentId} user={user} setUser={setUser}/>  
        )

  
}

export default PostChain;