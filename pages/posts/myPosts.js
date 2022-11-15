import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPostsByAuthorId } from '../../api/postData';
import { getUserByUid } from '../../api/userData';
import PostCard from '../../components/PostCard';
import ProfileCard from '../../components/ProfileCard';

export default function MyPostsPage({ token, setToken }) {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  const getMyPosts = () => {
    getUserByUid(token).then(setUser);
    getPostsByAuthorId(token).then(setPosts);
  };

  useEffect(() => {
    getMyPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <ProfileCard obj={user} setToken={setToken} token={token} />
      {posts?.map((postObj) => (
        <PostCard key={postObj.id} userToken={token} postObject={postObj} onUpdate={getMyPosts} />
      ))}
    </>
  );
}

MyPostsPage.propTypes = {
  token: PropTypes.string.isRequired,
  setToken: PropTypes.func.isRequired,
};
