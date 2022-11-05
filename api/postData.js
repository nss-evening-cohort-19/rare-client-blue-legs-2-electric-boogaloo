import axios from 'axios';

const dbUrl = 'http://localhost:8088/posts';

const getPostById = (id) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/${id}`)
    .then((postObj) => (postObj))
    .catch(reject);
});

const createPost = (postObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}`, postObj)
    .then(resolve)
    .catch(reject);
});

const updatePost = (postObj) => new Promise((resolve, reject) => {
  axios.put(`${dbUrl}`, postObj)
    .then(resolve)
    .catch(reject);
});

const getAllPosts = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

export {
  getAllPosts, getPostById, createPost, updatePost,
};
