import axios from 'axios';

const dbUrl = 'http://localhost:8088/posttags';

const getPostTagsByPostId = (postId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}?post_id=${postId}`)
    .then((tagsArr) => resolve(tagsArr))
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getPostTagsByPostId };
