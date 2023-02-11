import axios from 'axios';

//const baseURL = axios.create({ baseURL: 'https://univinfomation.herokuapp.com' });
const API = axios.create({ baseURL: 'http://localhost:5001' });
const baseURL = axios.create({ baseURL: 'https://univinfomation.herokuapp.com' });
const url = 'http://localhost:5001'
API.interceptors.request.use((req) => {
    if (localStorage.getItem('form')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('form')).token}`;
    }

    return req;
});

export const fetchPosts = () => API.get('/posts');

export const createPost = (newPost) => API.post('/posts', newPost);
//export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
//export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
//export const deletePost = (id) => axios.delete(`${id}`);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const fetchUsers = () => API.get('/user');
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);