import axios from 'axios';

const dbUrl = 'http://localhost:8088/posts';

const getAllPosts = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

export default getAllPosts;
