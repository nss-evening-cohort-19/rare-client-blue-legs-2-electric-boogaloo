import React, { useState, useEffect } from 'react';
import { getAllPosts } from '../../api/postData';
import AllPostComponent from '../../components/AllPostComponent';

export default function AllPostsPage() {
  const [posts, setAllPosts] = useState();

  const getPosts = () => {
    getAllPosts().then(setAllPosts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div>All Posts Page</div>
      {
        posts?.map((postObject) => (
          <AllPostComponent obj={postObject} key={postObject.id} onUpdate={getPosts} />
        ))
      }
    </>
  );
}
