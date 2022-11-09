import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProfileCard from '../../components/ProfileCard';
import getUserByUid from '../../api/userData';
import { getPostsbyUid } from '../../api/postData';
import AllPostComponent from '../../components/AllPostComponent';

export default function UserPage() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { userId } = router.query;

  const getTheContent = () => {
    getUserByUid(userId).then(setUser);
    getPostsbyUid(userId).then(setPosts);
  };

  useEffect(() => {
    getTheContent();
  }, [router]);

  return (
    <>
      <ProfileCard obj={user} />
      <div>
        {posts?.map((post) => (
          <AllPostComponent obj={post} key={post.id} onUpdate={getTheContent} />
        ))}
      </div>
    </>
  );
}
