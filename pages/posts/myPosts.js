import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getPostsByAuthorId } from '../../api/postData';
import PostCard from '../../components/PostCard';

export default function MyPostsPage() {
  const [posts, setPosts] = useState();
  const [token, setToken] = useState(null);
  const router = useRouter();

  const getMyPosts = () => {
    getPostsByAuthorId((Number(token))).then(setPosts);
  };

  useEffect(() => {
    const userToken = localStorage.getItem('auth_token');
    setToken(userToken);
    getMyPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <div>My Posts Page</div>
      {posts?.map((postObj) => (
        <PostCard key={postObj.id} router={router.asPath} postObject={postObj} onUpdate={getMyPosts} />
      ))}
    </>
  );
}
