/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../api/postData';
import PostCard from '../../components/PostCard';
import CommentForm from '../../components/CommentForm';
import CommentCard from '../../components/CommentCard';
import TagComponent from '../../components/TagComponent';
import getReactions from '../../api/reactionData';
import ReactionContainer from '../../components/Reactions/ReactionContainer';

export default function SinglePostPage() {
  const [post, setPost] = useState({});
  const router = useRouter();
  const [commentToUpdate, setCommentToUpdate] = useState({});
  const { postId } = router.query;
  const [token, setToken] = useState(null);
  const [reactions, setReactions] = useState([]);

  const getTheContent = () => {
    getSinglePost(postId).then(setPost).then(() => {
      getReactions().then(setReactions);
    });
  };

  const onUpdate = () => {
    router.push(`/posts/${postId}`);
  };

  useEffect(() => {
    const userToken = localStorage.getItem('auth_token');
    setToken(userToken);
    getTheContent();
  }, [router]);

  return (
    <div>
      <PostCard userToken={token} postObject={post} onUpdate={onUpdate} />
      <ReactionContainer reactions={reactions} postReactions={post.post_reactions} userToken={parseInt(token, 10)} postId={post.id} onUpdate={getTheContent} />
      <div>
        <CommentForm commentObj={commentToUpdate} postId={post.id} />
        {
          post.comments?.map((comment) => (
            <CommentCard commentObj={comment} key={comment.id} onUpdate={onUpdate} setCommentToUpdate={setCommentToUpdate} />
          ))
          }
      </div>
      <div>
        Tags
        {
          post.post_tags?.map((tag) => (
            <TagComponent tagObj={tag} />
          ))
          }
      </div>
    </div>
  );
}
