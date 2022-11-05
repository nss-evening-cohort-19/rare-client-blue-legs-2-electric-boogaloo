import axios from 'axios';

const dbUrl = 'http://localhost:8088/tags';

const getAllTags = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}.json`)
    .then((tagsArr) => resolve(tagsArr))
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getAllTags };
