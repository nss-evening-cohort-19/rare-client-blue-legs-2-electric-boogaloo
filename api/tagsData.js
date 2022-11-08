import axios from 'axios';

const dbUrl = 'http://localhost:8088/tags';

const getAllTags = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}`)
    .then((tagsArr) => resolve(Object.values(tagsArr.data)))
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getAllTags };
