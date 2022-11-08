import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProfileCard from '../../components/ProfileCard';
import getUserByUid from '../../api/userData';
import { getPostsbyUid } from '../../api/postData';
import PostCard from '../../components/PostCard';

export default function UserPage() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { uid } = router.query;

  const getTheContent = () => {
    getUserByUid(uid).then(setUser);
    getPostsbyUid(uid).then(setPosts);
  };

  useEffect(() => {
    getTheContent();
  }, [router]);

  return (
    <>
      <ProfileCard obj={user} />
      <div>
        {posts.map((post) => (
          <PostCard postObj={post} />
        ))}
      </div>
    </>
  );
}
