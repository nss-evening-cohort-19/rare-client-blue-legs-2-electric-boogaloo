const dbUrl = 'http://localhost:8088';

const getCommentsByPost = (postId) => fetch(`${dbUrl}/comments?post_id=${postId}`)
  .then((res) => res.json());

const deleteComment = (commentId) => fetch(`${dbUrl}/comments/${commentId}`).then((res) => res.json());

const getPost = (postId) => fetch(`${dbUrl}/posts/${postId}`).then((res) => res.json());

export { getCommentsByPost, deleteComment, getPost };
