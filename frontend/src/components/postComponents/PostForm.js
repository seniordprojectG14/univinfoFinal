import React, { useState, useEffect } from 'react';
import classes from './NewPost.module.css';
import Switch from '@mui/material/Switch';


import{ useSelector } from 'react-redux';

import axios from 'axios';




    



const PostForm = ({ currentId, setCurrentId, user, setUser}) => {
    const post = useSelector((state) => (currentId ? state.posts.find((description) => description._id === currentId) : null));
    const [postData, setPostData] = useState({address: '', photos: '', description: '', username: '', original_poster: ''});
    const [image, setImage] = React.useState(null);

    
      useEffect(() => {
        if (post) setPostData(post);
      }, [post]);

   
    const clear = () => {
      setCurrentId(0);
      setPostData({address: '', photos: '', description: '', username: '', original_poster: ''});
    };
  
 
    const fileSelected = event => {
      const file = event.target.files
      setImage(file)
    }

      
    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const config = {
        headers: {
          'Content-Type': 'application/json'
        },
      };
      console.log("submitting");

      
         const formdata = new FormData();
        
         for ( let i = 0; i < image?.length; i++ ) {
          formdata.append( "imagecropped", image[ i ], image[ i ].name );
        }
        console.log(JSON.stringify(image[0].name) + "formdata pics");
        console.log(JSON.stringify(postData.address) + "postData.address");
        console.log(JSON.stringify(postData.description) + "postData.description");
        console.log(JSON.stringify(user?.username) + "user?.username");
        

        formdata.append("len", image?.length);
        formdata.append("address", postData.address)
        formdata.append("description", postData.description)
        if (postData.original_poster === ""){
          formdata.append("original_poster", user?.username)
        } else{
          formdata.append("original_poster", postData.original_poster)
        }
        formdata.append("username", user?.username)
        
         const {data} = await axios.post("/posts", formdata, { headers: {
					'accept': 'application/json',
					'Content-Type': 'multipart/form-data'
				}})
        console.log(JSON.stringify(data) + "data")
        
      if (currentId === 0) {
        
        clear();
      } else {
        
        clear();
      }
    };
    

    
      
     
  

    return(
        <form className={classes.form} onSubmit={handleSubmit}>
  <div className={classes.control}>
    <label htmlFor='title'>address</label>
    <input type='text' id='address' value={postData.address} onChange={(e) => setPostData({ ...postData, address: e.target.value})}/>
  </div>
  <div className={classes.control}>
    <label >add photos</label>
    <div>
    <div className="container-buttons">

    <input multiple onChange={fileSelected} type="file" accept="image/*"></input>

          
              </div>
          </div>
  </div>
  <div className={classes.control}>
    <label htmlFor='description'>any other things to add</label>
    <textarea id='description'  rows='5' value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })}></textarea>
  </div>
  <div className={classes.actions}>
    <button onClick={(e) => setPostData({ ...postData, original_poster: "Anonymous user"})}>Add Post anonymously</button>
  </div>
  <div className={classes.actions}>
    <button>Add post</button>
  </div>
</form>
    );
}


export default PostForm;