import React,{useState,useEffect} from 'react';
import classes from './PostList.module.css';
import { Button, Paper,Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';


import { useSelector } from 'react-redux';






const MyProfile = ({ currentId,setCurrentId, user, setUser }) => {




  const [username, setUserName,PhoneNumber,NickName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(localStorage.getItem("userInfo")
      )
    );
  }, []);


  if (!username) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to see your account.
        </Typography>
      </Paper>
    );
  }
 
 


return (
    <form className={classes.form}>
    <div className={classes.control}>
      <label htmlFor='title'>username: </label>
      <input type='text' id='username' value={username.username} onChange={(e) => setUserName({ ...username.username, username: e.target.value })}/>
      <Button>update</Button>


      <label htmlFor='title'>NikeName: </label>
      <input type='text' id='NikeName'/>
      <Button>update</Button>


      <label htmlFor='title'>PhoneNumber: </label>
      <input type='text' id='PhoneNumber' />
      <Button>update</Button>
    </div>
  </form>
 
     
);
}


 


export default MyProfile;
