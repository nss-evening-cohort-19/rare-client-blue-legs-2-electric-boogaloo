import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import getSinglePost from '../../api/postData';
import PostCard from '../../components/PostCard';

export default function SinglePostPage() {
  const [post, setPost] = useState({});
  const router = useRouter();
  const { postId } = router.query;

  const getThePost = () => {
    getSinglePost(postId).then(setPost);
    console.warn(post);
  };

  useEffect(() => {
    getThePost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <PostCard router={router} postObject={post} onUpdate={getThePost} />
    </div>
  );
}
