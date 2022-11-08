import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPostById } from '../../../api/postData';
import PostForm from '../../../components/PostForm';

export default function EditPostPage() {
  const [post, setPost] = useState({});
  const router = useRouter();
  const { postId } = router.query;

  useEffect(() => {
    getPostById(postId).then(setPost);
  }, [router, postId]);

  return (
    <PostForm obj={post} />
  );
}
