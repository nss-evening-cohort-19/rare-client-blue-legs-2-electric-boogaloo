/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../api/postData';
import PostCard from '../../components/PostCard';
import CommentForm from '../../components/CommentForm';
import CommentCard from '../../components/CommentCard';

export default function SinglePostPage() {
  const [post, setPost] = useState({});
  const router = useRouter();
  const [commentToUpdate, setCommentToUpdate] = useState({});
  const { postId } = router.query;

  const getThePost = () => {
    getSinglePost(postId).then(setPost);
  };

  const onUpdate = () => {
    router.push('/posts/myPosts');
  };

  useEffect(() => {
    getThePost();
  }, [router]);

  return (
    <div>
      <PostCard router={router} postObject={post} onUpdate={getThePost} />
      <div>
        <CommentForm commentObj={commentToUpdate} postId={post.id} />
        {
          post.comments?.map((comment) => (
            <CommentCard commentObj={comment} key={comment.id} onUpdate={onUpdate} setCommentToUpdate={setCommentToUpdate} />
          ))
          }
      </div>
    </div>
  );
}
