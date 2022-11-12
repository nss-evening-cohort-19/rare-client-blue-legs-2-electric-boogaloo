import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../api/categoryData';
import { getAllPosts } from '../api/postData';
import { getAllTags } from '../api/tagData';
import AllPostComponent from '../components/AllPostComponent';
import FilterButtons from '../components/FilterButtons';
import Search from '../components/Search';
import SortByComponent from '../components/SortByComponent';

export default function AllPostsPage() {
  const [posts, setAllPosts] = useState();
  const [categories, setAllCategories] = useState();
  const [tags, setAllTags] = useState();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const onClick = (event) => {
    if (event === true) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const getPosts = () => {
    getAllPosts().then((thePosts) => {
      setAllPosts(thePosts);
      setFilteredPosts(thePosts);
    });
  };

  const getCategories = () => {
    getAllCategories().then(setAllCategories);
  };

  const getTags = () => {
    getAllTags().then(setAllTags);
  };

  useEffect(() => {
    getPosts();
    getCategories();
    getTags();
  }, []);

  return (
    <>
      <Search posts={posts} setFilteredPosts={setFilteredPosts} onUpdate={getPosts} />
      <SortByComponent posts={posts} setFilteredPosts={setFilteredPosts} onUpdate={getPosts} setShowResults={onClick} />
      { showResults ? <FilterButtons categories={categories} tags={tags} posts={posts} setFilteredPosts={setFilteredPosts} onUpdate={getPosts} /> : null}
      {
        filteredPosts?.map((postObject) => (
          <AllPostComponent obj={postObject} key={postObject.id} />
        ))
      }
    </>
  );
}
