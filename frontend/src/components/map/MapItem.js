import React,{useEffect, useState} from 'react';
import Card from '../ui/Card';
import { Tooltip, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import classes from '../postComponents/PostItem.module.css';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import useStyles from '../postComponents/styles.js';
import Geocode from "react-geocode";
import PushPinIcon from '@mui/icons-material/PushPin';



const MapItem = ({ post,defaultCenter, setCurrentId, user, setUser,proplist }) => {
  const classstyles = useStyles();
  const [latt, setLat] = React.useState('');
  const [lngg, setLng] = React.useState('');
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

  const AnyReactComponent = props => {
        
    return <PushPinIcon/>;
    }
    const defaultProps = {
        center: {
          lat: latt,
          lng: lngg
        },
        zoom: 11
      };



  
    return(

      
      <li className={classes.item}>
        <Tooltip title={
<Card>
<CardMedia className={classes.media} image={post.photo || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.photo} />
  <div className={classes.content}>

    
    <h3>address:{post.address}</h3>
    
    <div className={classstyles.details}>
  <div style={{textalign: 'center',
      paddingLeft: '480px'}}>
  <img src={post.photos[0]}  height={'200px'} width={'300px'} alt="BigCo Inc. logo"/>
  </div>


  <Typography variant="body2" color="textSecondary" component="h2">username:{post?.username}</Typography>
      </div>
    <p>description: {post.description}</p>
  </div>
  <div className={classes.actions}>
  <Button>Chat</Button>
  <p variant="body2">{moment(post.createdAt).fromNow()}</p>
 
  </div>
</Card>
        } arrow>
  <Button>
    
  
    <AnyReactComponent
              lat={latt}
              lng={lngg}
             
            />
            
            
            </Button>
</Tooltip>
        
           
     
    </li>

    );
    }
    

export default MapItem;