import React, { useEffect, useState } from 'react';
import { getPostsByAuthorId } from '../../api/postData';
import { getUserByUid } from '../../api/userData';
import PostCard from '../../components/PostCard';
import ProfileCard from '../../components/ProfileCard';

export default function MyPostsPage() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(null);

  const getMyPosts = () => {
    getUserByUid(token).then(setUser);
    getPostsByAuthorId(token).then(setPosts);
  };

  useEffect(() => {
    const userToken = localStorage.getItem('auth_token');
    setToken(userToken);
    getMyPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <ProfileCard obj={user} />
      {posts?.map((postObj) => (
        <PostCard key={postObj.id} userToken={token} postObject={postObj} onUpdate={getMyPosts} />
      ))}
    </>
  );
}
