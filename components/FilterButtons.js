/* eslint-disable react/require-default-props */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Chip, Stack } from '@mui/material';

export default function FilterButtons({
  categories, posts, setFilteredPosts, onUpdate,
}) {
  const handleClick = (event) => {
    if (event.target.innerHTML === 'All') {
      onUpdate();
    } else {
      const categoryFilter = posts.filter((thaPost) => thaPost.category.label === event.target.innerHTML);
      setFilteredPosts(categoryFilter);
    }
  };

  return (
    <div>
      <div>
        <p>Category</p>
        <Stack direction="row" spacing={1}>
          <Chip style={{ backgroundColor: 'white', color: 'black' }} label="All" variant="outlined" onClick={handleClick} />
          {categories?.map((category) => (
            <Chip label={category.label} style={{ backgroundColor: 'white', color: 'black' }} variant="outlined" onClick={handleClick} key={category.id} />
          ))}
        </Stack>
      </div>
    </div>
  );
}

FilterButtons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  })),
  posts: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
  })),
  setFilteredPosts: PropTypes.func,
  onUpdate: PropTypes.func,
};
