import axios from 'axios';

const dbUrl = 'http://localhost:8088/posts';

const getPostById = (id) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/${id}`)
    .then((postObj) => resolve(postObj.data))
    .catch(reject);
});

const createPost = (postObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}`, postObj)
    .then((newObj) => resolve(newObj.data))
    .catch(reject);
});

const updatePost = (postObj) => new Promise((resolve, reject) => {
  axios.put(`${dbUrl}/${postObj.id}`, postObj)
    .then(resolve)
    .catch(reject);
});

const getAllPosts = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getPostsByAuthorId = (authorId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}?author_id=${authorId}`)
    .then((response) => resolve((response.data)))
    .catch(reject);
});

const getSinglePost = (postId) => fetch(`http://localhost:8088/posts/${postId}`)
  .then((res) => res.json());

export {
  getAllPosts, getPostById, createPost, updatePost, getSinglePost, getPostsByAuthorId,
};
