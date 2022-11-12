/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Search({ posts, setFilteredPosts, onUpdate }) {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);
    if (value) {
      const results = posts.filter((post) => post.title.toLowerCase().includes(searchInput.toLowerCase()));
      setFilteredPosts(results);
    } else {
      onUpdate();
    }
  };

  return (
    <>
      <input className="search" placeholder="Search" value={searchInput} onChange={handleChange} />
    </>
  );
}

Search.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    id: PropTypes.number,
  })),
  setFilteredPosts: PropTypes.func,
  onUpdate: PropTypes.func,
};
