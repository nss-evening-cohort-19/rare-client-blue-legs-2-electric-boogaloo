import React, { useState, useEffect } from 'react';
import { getAllPosts } from '../api/postData';
import AllPostComponent from '../components/AllPostComponent';
import Search from '../components/Search';
import SortByComponent from '../components/SortByComponent';

export default function AllPostsPage() {
  const [posts, setAllPosts] = useState();
  const [filteredPosts, setFilteredPosts] = useState([]);

  const getPosts = () => {
    getAllPosts().then((thePosts) => {
      setAllPosts(thePosts);
      setFilteredPosts(thePosts);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Search posts={posts} setFilteredPosts={setFilteredPosts} onUpdate={getPosts} />
      <SortByComponent posts={posts} setFilteredPosts={setFilteredPosts} onUpdate={getPosts} />
      {
        filteredPosts?.map((postObject) => (
          <AllPostComponent obj={postObject} key={postObject.id} />
        ))
      }
    </>
  );
}
