import axios from 'axios';

const deletePostReaction = (id) => new Promise((resolve, reject) => {
  axios.delete(`http://localhost:8088/postreactions/${id}`)
    .then(resolve)
    .catch(reject);
});

const createPostReaction = (payload) => new Promise((resolve, reject) => {
  axios.post('http://localhost:8088/postreactions', payload)
    .then((object) => resolve(object.data))
    .catch((error) => reject(error));
});

export { deletePostReaction, createPostReaction };
