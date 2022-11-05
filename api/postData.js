import axios from 'axios';

const dbUrl = 'http://localhost:8088/posts';

const getPostById = (id) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/${id}.json`)
    .then((postObj) => (postObj))
    .catch(reject);
});

const createPost = (postObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}.json`, postObj)
    .then(resolve)
    .catch(reject);
});

const updatePost = (postObj) => new Promise((resolve, reject) => {
  axios.put(`${dbUrl}`, postObj)
    .then(resolve)
    .catch(reject);
});

export default { getPostById, createPost, updatePost };
