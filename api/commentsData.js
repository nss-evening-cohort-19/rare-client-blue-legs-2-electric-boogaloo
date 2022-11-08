import axios from 'axios';

const dbUrl = 'http://localhost:8088';

const getCommentsByPost = (postId) => fetch(`${dbUrl}/comments?post_id=${postId}`)
  .then((res) => res.json());

const deleteComment = (commentId) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/comments/${commentId}`)
    .then(resolve)
    .catch(reject);
});

const updateComment = (commentObj) => new Promise((resolve, reject) => {
  axios.put(`${dbUrl}/comments/${commentObj.id}`, commentObj)
    .then(resolve)
    .catch(reject);
});

const createComment = (commentObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/comments`, commentObj)
    .then(resolve)
    .catch(reject);
});

const getPost = (postId) => fetch(`${dbUrl}/posts/${postId}`).then((res) => res.json());

export {
  getCommentsByPost, deleteComment, getPost, updateComment, createComment,
};
