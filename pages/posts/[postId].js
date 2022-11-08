/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPostById } from '../../api/postData';
import AllPostComponent from '../../components/AllPostComponent';
import CommentCard from '../../components/CommentCard';

export default function SinglePostPage() {
  const [post, setPost] = useState({});
  const router = useRouter();
  const { postId } = router.query;

  const getThePost = () => {
    getPostById(postId).then(setPost);
  };

  useEffect(() => {
    getThePost();
  }, [router, postId]);

  return (
    <div>
      <AllPostComponent obj={post} />
      <div>
        {
          post.comments?.map((comment) => (
            <CommentCard commentObj={comment} key={comment.id} onUpdate={getThePost} />
          ))
          }
      </div>
    </div>
  );
}
