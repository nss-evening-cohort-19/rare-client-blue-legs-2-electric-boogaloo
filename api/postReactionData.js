import axios from 'axios';

const deletePostReaction = (id) => new Promise((resolve, reject) => {
  axios.delete(`https://localhost:8088/postReactions/${id}`)
    .then(resolve)
    .catch(reject);
});

export default deletePostReaction;
