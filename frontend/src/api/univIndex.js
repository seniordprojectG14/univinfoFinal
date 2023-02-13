
import { FETCH_ALL, CREATE, DELETE, LIKE, disLIKE, ADD_USERNAME, REMOVE_USERNAME, UPDATE_POST} from '../constants/actionTypes';
import axios from 'axios';


//const baseURL = axios.create({ baseURL: 'https://univinfomation.herokuapp.com' });
 const API = axios.create({ baseURL: 'http://localhost:5001' });
// const baseURL = axios.create({ baseURL: 'https://univinfomation.herokuapp.com' });
const url = 'http://127.0.0.1:5001/posts'
// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('form')) {
//       req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('form')).token}`;
//     }

//     return req;
// });

export const fetchPosts = () =>{
  console.log("getting posts");
  API.get('/posts');
} 

export const createPost = (newPost) => API.post('/posts', newPost);
//export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
//export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
//export const deletePost = (id) => axios.delete(`${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const fetchUsers = () => API.get('/user');
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const dislikePost = (id) => axios.patch(`${url}/${id}/dislikePost`);
export const deletePost = (id) =>{
  
  axios.delete(`${url}/${id}`);
  console.log("here");
} 
// export const addUsernameDisLikes = (id, username, dispatch) =>{
// const data = {
//   username,
// };                           
// axios.patch(`/posts/${id}/addUsernameDisLikes`, data)
//   .then((response) => {
//     dispatch({ type: ADD_USERNAME, payload: response.data });
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// }

export const addUsernameDisLikes = (id, username) => {
  const data = {
    username,
  };
  return axios.patch(`/posts/${id}/addUsernameDisLikes`, data)
    .then(response => response.data)
    .catch((error) => {
      console.error(error);
    });
};

export const subUsernameLikes = (id, username, dispatch) =>{
  const data = {
    username,
  };
  return axios.patch(`/posts/${id}/subUsernameLikes`, data)
    .then(response => response.data)
    .catch((error) => {
      console.error(error);
    });
  }


  // const data = {
  //   username,
  // };                           
  // axios.patch(`/posts/${id}/subUsernameLikes`, data)
  //   .then((response) => {
      
  //     dispatch({ type: REMOVE_USERNAME, payload: { id, username } });
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // }

  export const subUsernameDisLikes = (id, username, dispatch) =>{
    const data = {
      username,
    };
    return axios.patch(`/posts/${id}/subUsernameDisLikes`, data)
      .then(response => response.data)
      .catch((error) => {
        console.error(error);
      });
  
  }

export const addUsernameLikes = (id, username, dispatch) =>{
  const data = {
    username,
  };
  return axios.patch(`/posts/${id}/addUsernameLikes`, data)
    .then(response => response.data)
    .catch((error) => {
      console.error(error);
    });

  }

  export const fetchPostById = (id) => API.get(`/posts/${id}`);
export const takeUsernameDisLikes = (id, username, dispatch) =>{
  const data = {
    username,
  };
  
  axios.patch(`/posts/${id}/takeUsernameDisLikes`, data)
    .then((response) => {
      dispatch({ type: ADD_USERNAME, payload: response.data });
    })
    .catch((error) => {
      console.error(error);
    });
  
  }
// export const addUsername = (id, username, dispatch) =>{
//   const formdata = new FormData();
//   console.log(username + "username in api");
//   formdata.append("username", username)
//   console.log(JSON.stringify(formdata?.username) + "formData");
//   // const {data} = axios.post(`${url}/${id}/addUsername`,formdata, {headers: {
//     const {data} = axios.patch("/posts/63e918d63f12e205b5fdfdcd/addUsername",formdata, { headers: {
//       'accept': 'application/json',
//       'Content-Type': 'multipart/form-data'
//     }})
//     console.log(data);
//   // axios.patch(`${url}/${id}/addUsername`);
  
//   dispatch({ type: ADD_USERNAME, payload: data });

// } 


