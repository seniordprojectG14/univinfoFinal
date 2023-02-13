import { FETCH_ALL, CREATE, DELETE, LIKE, disLIKE, ADD_USERNAME, UPDATE_POST} from '../constants/actionTypes';
import axios from 'axios';
import * as api from '../api/univIndex.js';

export const getPosts = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    // const { data } = await api.fetchPosts();
    const { data } = await axios.get(
      "/posts",
      {},
      config
    );
    console.log(JSON.stringify(data) + " data both")
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    //console.log(JSON.stringify(post)+ "createPost JSON.stringify(post)");
    const { data } = await api.createPost(post);
    ///console.log(JSON.stringify(data)+ "createPost JSON.stringify(data)");
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    
    const { data } = await api.fetchUsers();
    

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// export const likePost = (id) => async (dispatch) => {
//   try {
//     const { data } = await api.likePost(id);

//     dispatch({ type: LIKE, payload: data });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

////////
export const likePost = (id, likeCount, currentUser, PostListUsers, post) => async (dispatch) => {
  try {
    console.log(currentUser + "currentUser");
    console.log(currentUser + "PostListUsers");
    if (post?.postListLikeUsernames?.includes(currentUser)){
      console.log("allready liked likePost");
      const updatedPost = await api.subUsernameLikes(id, currentUser);
      dispatch({ type: 'UPDATE_POST', payload: updatedPost });
    }
    // if (post?.postListDisLikeUsernames.includes(currentUser) ){
    //   console.log("allready disliked likePost");
      // await api.addUsernameLikes(id, currentUser, dispatch);
      // dispatch({ type: 'ADD_USERNAME', payload: { id, username: currentUser } });
      // const updatedPost = await api.addUsernameLikes(id, currentUser);
      // dispatch({ type: 'UPDATE_POST', payload: updatedPost });
    //}
    if (usernameNotInList(post?.postListLikeUsernames, currentUser) && usernameNotInList(post?.postListDisLikeUsernames, currentUser)) {
      console.log("here");
      // await api.addUsernameLikes(id, currentUser, dispatch);
      // dispatch({ type: 'ADD_USERNAME', payload: { id, username: currentUser } });
      const updatedPost = await api.addUsernameLikes(id, currentUser);
      dispatch({ type: 'UPDATE_POST', payload: updatedPost });
    }
  } catch (error) {
    console.log(error.message);
    console.log("error");
  }
}
export const addLike = (id, likeCount, currentUser, PostListUsers, post) => async (dispatch) => {
  try {
    console.log(currentUser + "currentUser");
    console.log(currentUser + "PostListUsers");
    if (post?.postListLikeUsernames.includes(currentUser) ){
      console.log("allready disliked addLike");
      const { data } = await api.dislikePost(id);
      dispatch({ type: LIKE, payload: data });
    }
    
    // if (post?.postListDisLikeUsernames.includes(currentUser) ){
    //     console.log("allready liked addLike");
    //   const { data } = await api.likePost(id);
    //  dispatch({ type: LIKE, payload: data });
      

      
    // }
    if (usernameNotInList(post?.postListLikeUsernames, currentUser) && usernameNotInList(post?.postListDisLikeUsernames, currentUser)) {
  
    
      console.log("here addLike");
      const { data } = await api.likePost(id);
     dispatch({ type: LIKE, payload: data });
    }
  } catch (error) {
    console.log(error.message);
    console.log("error");
  }
}

const usernameNotInList = (usernameList, username) => {
  return !usernameList.includes(username);
}
const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

////////
export const dislikePost = (id, likeCount, currentUser, PostListUsers, post) => async (dispatch) => {
  try {
    console.log(currentUser + "currentUser");
    console.log(currentUser + "PostListUsers");
    if (post?.postListDisLikeUsernames.includes(currentUser) ){
      const updatedPost = await api.subUsernameDisLikes(id, currentUser);
      dispatch({ type: 'UPDATE_POST', payload: updatedPost });
      console.log("allready disliked");
    }
    // if (post?.postListLikeUsernames?.includes(currentUser)){
    //   console.log("allready liked post");
      // await api.addUsernameDisLikes(id, currentUser, dispatch);
      // dispatch({ type: 'ADD_USERNAME', payload: { id, username: currentUser } });
      //const updatedPost = await api.fetchPostById(id);
      //dispatch({ type: 'UPDATE_POST', payload: updatedPost });

      // const updatedPost = await api.addUsernameDisLikes(id, currentUser);
      // dispatch({ type: 'UPDATE_POST', payload: updatedPost });
     
    // }
    if (usernameNotInList(post?.postListLikeUsernames, currentUser) && usernameNotInList(post?.postListDisLikeUsernames, currentUser)) {
      console.log("here");
      // await api.addUsernameDisLikes(id, currentUser, dispatch);
      // dispatch({ type: 'ADD_USERNAME', payload: { id, username: currentUser } });
      //const updatedPost = await api.fetchPostById(id);
     /// dispatch({ type: 'UPDATE_POST', payload: updatedPost });
     const updatedPost = await api.addUsernameDisLikes(id, currentUser);
    dispatch({ type: 'UPDATE_POST', payload: updatedPost });
   

    }
  } catch (error) {
    console.log(error.message);
    console.log("error");
  }
};

export const addDisLike = (id, likeCount, currentUser, PostListUsers, post) => async (dispatch) => {
  try {
    console.log("addDisLike");
    console.log(likeCount + "likeCount");
    console.log(currentUser + "currentUser");
    console.log(currentUser + "PostListUsers");
    if (post?.postListDisLikeUsernames.includes(currentUser) ){
      console.log("allready disliked");
      const { data } = await api.likePost(id);
      dispatch({ type: LIKE, payload: data });
    }
    // if (post?.postListLikeUsernames?.includes(currentUser)){
    //   console.log("allready liked");
    //   if(likeCount <= -4){

    //     console.log("deleting post with id " + id);
    //     await axios.delete(`/posts/${id}`);
    //     dispatch({ type: DELETE, payload: id });
    //   }else{
      
    //   const { data } = await api.dislikePost(id);
    //   dispatch({ type: LIKE, payload: data });
    //   }
    // }
    if (usernameNotInList(post?.postListLikeUsernames, currentUser) && usernameNotInList(post?.postListDisLikeUsernames, currentUser)) {
      console.log("here");
      if(likeCount == -4){
        console.log("deleting post with id " + id);
        await axios.delete(`/posts/${id}`);
        dispatch({ type: DELETE, payload: id });
      }else{
        const { data } = await api.dislikePost(id);
        dispatch({ type: LIKE, payload: data });
      }
    

    }
  } catch (error) {
    console.log(error.message);
    console.log("error");
  }
};
//////////
export const subUsernameLikes = (id, likeCount, currentUser, PostListUsers, post) => async (dispatch) => {
  try {
    console.log(currentUser + "currentUser");
    console.log(currentUser + "PostListUsers");
    if (post?.postListDisLikeUsernames.includes(currentUser) ){
      console.log("allready disliked subUsernameLikes");
    }
    // if (post?.postListLikeUsernames?.includes(currentUser)){
    //   console.log("allready liked subUsernameLikes");
      // await api.addUsernameDisLikes(id, currentUser, dispatch);
      // await wait(1000); 
      // const updatedPost = await api.subUsernameLikes(id, currentUser);
      // dispatch({ type: 'UPDATE_POST', payload: updatedPost });
    //}
    if (usernameNotInList(post?.postListLikeUsernames, currentUser) && usernameNotInList(post?.postListDisLikeUsernames, currentUser)) {
      console.log("here subUsernameLikes");
      //await api.addUsernameDisLikes(id, currentUser, dispatch);

    }
  } catch (error) {
    console.log(error.message);
    console.log("error");
  }
};
///////////////
export const subUsernameDisLikes = (id, likeCount, currentUser, PostListUsers, post) => async (dispatch) => {
  try {
    console.log(currentUser + "currentUser");
    console.log(currentUser + "PostListUsers");
    if (post?.postListDisLikeUsernames.includes(currentUser) ){
      console.log("allready disliked subUsernameLikes");
    }
    // if (post?.postListDisLikeUsernames?.includes(currentUser)){
    //   console.log("allready liked subUsernameLikes");
      // await api.addUsernameDisLikes(id, currentUser, dispatch);
      // await wait(1000); 
      // const updatedPost = await api.subUsernameDisLikes(id, currentUser);
      // dispatch({ type: 'UPDATE_POST', payload: updatedPost });
    // }
    if (usernameNotInList(post?.postListLikeUsernames, currentUser) && usernameNotInList(post?.postListDisLikeUsernames, currentUser)) {
      console.log("here subUsernameLikes");
      //await api.addUsernameDisLikes(id, currentUser, dispatch);

    }
  } catch (error) {
    console.log(error.message);
    console.log("error");
  }
};



export const addUser = (id, likeCount, currentUser, PostListUsers, post) => async (dispatch) => {
  try {
    await api.addUsernameDisLikes(id, currentUser, dispatch);
    // const { data } = await api.dislikePost(id);
    // console.log(JSON.stringify(data) + "likedata");
    // dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
}

// export const dislikePost = (id, likeCount, currentUser, PostListUsers) => async (dispatch) => {
//   try {
//     console.log(currentUser + "currentUser");
//     console.log(currentUser + "PostListUsers");
//     const formData = new FormData();
//     if (PostListUsers.includes(currentUser)){
//       console.log("allready liked");
//     }else{
//       const response = await api.addUsername(id, currentUser);
//       console.log(JSON.stringify(response) + "disdata");
//       if (response.data) {
//         dispatch({ type: ADD_USERNAME, payload: response.data });
//         if (likeCount == -4){
//           console.log("deleting post with id " + id);
//         await axios.delete(`/posts/${id}`);
//         dispatch({ type: DELETE, payload: id });
//         }else{
//           const { data } = await api.dislikePost(id);
//         dispatch({ type: LIKE, payload: data });
//         }
//       } else {
//         console.error(`Error adding username: ${response}`);
//       }
//     }
//   } catch (error) {
//     console.error(`Error adding username: ${error}`);
//   }
// };






/*
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
*/



export const deletePost = (id) => async (dispatch) => {
  try {
    console.log("deleting post with id " + id.id);
    // await axios.delete(`${'https://univinfomation.herokuapp.com'}/${id.id}`);
    await axios.delete(`/posts/${id.id}`);
    // console.log("deleting post with id " + id.id);
    dispatch({ type: DELETE, payload: id.id });
  } catch (error) {
    console.log(error.message);
  }
};



