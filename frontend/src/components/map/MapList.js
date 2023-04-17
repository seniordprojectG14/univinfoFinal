import React,{useEffect, useState} from 'react';
import Card from '../ui/Card';
import { Tooltip, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import classes from '../postComponents/PostItem.module.css';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import useStyles from '../postComponents/styles.js';
import Geocode from "react-geocode";
import PushPinIcon from '@mui/icons-material/PushPin';
import GoogleMaps from './GoogleMaps';
import { useSelector } from 'react-redux';

const MapList = ({ post,defaultCenter, setCurrentId, user, setUser,proplist }) => {
    
    const posts = useSelector((state) => state.posts);
    
    const [latt, setLat] = React.useState('');
    const [lngg, setLng] = React.useState('');
  
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
        
        <GoogleMaps />
    );
 
        

}
      
  
  export default MapList;