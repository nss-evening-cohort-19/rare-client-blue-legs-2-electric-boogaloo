import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../api/categoryData';
import { getAllPosts } from '../api/postData';
import AllPostComponent from '../components/AllPostComponent';
import FilterButtons from '../components/FilterButtons';
import Search from '../components/Search';
import SortByComponent from '../components/SortByComponent';

export default function AllPostsPage() {
  const [posts, setAllPosts] = useState();
  const [categories, setAllCategories] = useState();
  const [filteredPosts, setFilteredPosts] = useState([]);

  const getPosts = () => {
    getAllPosts().then((thePosts) => {
      setAllPosts(thePosts);
      setFilteredPosts(thePosts);
      console.warn(thePosts);
    });
  };

  const getCategories = () => {
    getAllCategories().then(setAllCategories);
  };

  useEffect(() => {
    getPosts();
    getCategories();
  }, []);

  return (
    <>
      <Search posts={posts} setFilteredPosts={setFilteredPosts} onUpdate={getPosts} />
      <FilterButtons categories={categories} posts={posts} setFilteredPosts={setFilteredPosts} />
      <SortByComponent posts={posts} setFilteredPosts={setFilteredPosts} onUpdate={getPosts} />
      {
        filteredPosts?.map((postObject) => (
          <AllPostComponent obj={postObject} key={postObject.id} />
        ))
      }
    </>
  );
}
