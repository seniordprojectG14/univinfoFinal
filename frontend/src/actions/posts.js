import { FETCH_ALL, CREATE, DELETE, LIKE} from '../constants/actionTypes';
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
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
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
    //dispatch({ type: DELETE, payload: id.id });
  } catch (error) {
    console.log(error.message);
  }
};


