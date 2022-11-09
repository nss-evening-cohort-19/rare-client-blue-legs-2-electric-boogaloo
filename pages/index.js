import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { getAllPosts } from '../api/postData';
import AllPostComponent from '../components/AllPostComponent';

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
      <div className="addButton">
        <Link passHref href="/posts/new">
          <AddIcon />
        </Link>
      </div>
      {
        posts?.map((postObject) => (
          <AllPostComponent obj={postObject} key={postObject.id} onUpdate={getPosts} />
        ))
      }
    </>
  );
}
