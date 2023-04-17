import React,{useEffect, useState} from 'react';
import MapItem from './MapItem';




  const MapChain = ({college, firstAddress, address, pclist, setPcist, list, counter, lookingfor, maxval, minval, typeval, bedroomsval, post, setCurrentId, user, setUser,proplist }) => {


 



        return(
            <MapItem post={post} setCurrentId={setCurrentId} user={user} setUser={setUser}/>  
        )

  
}

export default MapChain;