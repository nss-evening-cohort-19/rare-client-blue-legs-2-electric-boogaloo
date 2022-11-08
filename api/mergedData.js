import { createPostTag, deletePostTag, getPostTagsByPostId } from './postTagsData';

const deletePostTagsByPostId = (postId) => new Promise((resolve, reject) => {
  getPostTagsByPostId(postId).then((tagsArr) => {
    if (tagsArr.length) {
      const deleteTags = tagsArr.map((tag) => deletePostTag(tag.id));
      Promise.all(deleteTags)
        .then(resolve)
        .catch(reject);
    }
  }).then(resolve).catch(reject);
});

const createPostTags = (tagsArr) => new Promise((resolve, reject) => {
  const createTags = tagsArr.map((tag) => createPostTag(tag));
  Promise.all(createTags).then(resolve).then(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { deletePostTagsByPostId, createPostTags };