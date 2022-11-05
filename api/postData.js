import axios from 'axios';

const dbUrl = 'http://localhost:8088/posts';

const getAllPosts = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getSinglePost = (postId) => fetch(`http://localhost:8088/posts/${postId}`)
  .then((res) => res.json());

export { getAllPosts, getSinglePost };
