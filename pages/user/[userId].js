import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProfileCard from '../../components/ProfileCard';
import getUserByUid from '../../api/userData';
import { getPostsByAuthorId } from '../../api/postData';
import PostCard from '../../components/PostCard';

export default function UserPage() {
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
      <ProfileCard obj={user} />
      <div>
        {posts?.map((post) => (
          <PostCard postObject={post} key={post.id} router={router.asPath} onUpdate={getTheContent} />
        ))}
      </div>
    </>
  );
}
