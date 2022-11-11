import { deleteComment } from './commentsData';
import { deletePost } from './postData';
import deletePostReaction from './postReactionData';
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

const deletePostAndStuff = async (postObject) => {
  const commentsToDelete = postObject.comments.map((comment) => deleteComment(comment.id));
  const postTagsToDelete = postObject.post_tags.map((postTag) => deletePostTag(postTag.id));
  const postReactionsToDelete = postObject.post_reactions.map((postReaction) => deletePostReaction(postReaction.id));
  await Promise.all(commentsToDelete).then(() => {
    Promise.all(postTagsToDelete);
  }).then(() => {
    Promise.all(postReactionsToDelete);
  });
  return deletePost(postObject.id);
};

// eslint-disable-next-line import/prefer-default-export
export { deletePostTagsByPostId, createPostTags, deletePostAndStuff };
