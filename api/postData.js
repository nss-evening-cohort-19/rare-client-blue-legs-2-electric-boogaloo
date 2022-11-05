const getSinglePost = (postId) => fetch(`http://localhost:8088/posts/${postId}`)
  .then((res) => res.json());

export default getSinglePost;
