// eslint-disable-next-line import/prefer-default-export
export const getAllTags = () => fetch('http://localhost:8088/tags')
  .then((res) => res.json());

export const createTag = (tag) => fetch('http://localhost:8088/tags', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(tag),
});

export const getTagsByPost = (postId) => fetch(`http://localhost:8088/posttags?post_id=${postId}`)
  .then((res) => res.json());
