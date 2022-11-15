/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import ProfileCard from '../../components/ProfileCard';
import { getUserByUid } from '../../api/userData';
import { getPostsByAuthorId } from '../../api/postData';
import PostCard from '../../components/PostCard';

export default function UserPage({ token }) {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { userId } = router.query;

  const getTheContent = () => {
    getUserByUid(userId).then(setUser);
    getPostsByAuthorId(userId).then(setPosts);
  };

  useEffect(() => {
    getTheContent();
  }, [router]);

  return (
    <>
      <ProfileCard obj={user} token={token} />
      <div>
        {posts?.map((post) => (
          <PostCard postObject={post} key={post.id} router={router.asPath} onUpdate={getTheContent} />
        ))}
      </div>
    </>
  );
}

UserPage.propTypes = {
  token: PropTypes.string.isRequired,
};
