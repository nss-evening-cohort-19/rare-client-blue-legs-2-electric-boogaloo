import axios from 'axios';

const dbUrl = 'http://localhost:8088/posttags';

const getPostTagsByPostId = (postId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}?post_id=${postId}`)
    .then((tagsArr) => resolve(Object.values(tagsArr.data)))
    .catch(reject);
});

const createPostTag = (postObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}`, postObj)
    .then(resolve)
    .catch(reject);
});

const deletePostTag = (id) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/${id}`)
    .then(resolve)
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getPostTagsByPostId, createPostTag, deletePostTag };
