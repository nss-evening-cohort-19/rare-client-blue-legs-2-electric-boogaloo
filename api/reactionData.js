import axios from 'axios';

const getReactions = () => new Promise((resolve, reject) => {
  axios.get('http://localhost:8088/reactions')
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export default getReactions;
