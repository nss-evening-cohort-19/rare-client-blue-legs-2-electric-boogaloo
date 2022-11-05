import axios from 'axios';

const dbUrl = 'http://localhost:8088/categories';

const getAllCategories = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}`)
    .then((catArr) => resolve(catArr))
    .catch(reject);
});

export default getAllCategories;
