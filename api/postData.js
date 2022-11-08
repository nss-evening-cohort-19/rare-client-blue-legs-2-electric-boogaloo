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

const getSinglePost = (postId) => fetch(`http://localhost:8088/posts/${postId}`)
  .then((res) => res.json());

const getPostsbyUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}?user_id=${uid}`)
    .then((postsArr) => resolve(Object.values(postsArr.data)))
    .catch(reject);
});

export {
  getAllPosts, getPostById, createPost, updatePost, getSinglePost, getPostsbyUid,
};
